const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "store_db",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 5432,
});

const botToken = process.env.TELEGRAM_BOT_TOKEN || "YOUR_BOT_TOKEN";

const groupChatId = process.env.TELEGRAM_GROUP_CHAT_ID || null;
const bot = new TelegramBot(botToken, {
  polling: true,
});

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;
  const telegramUsername = username ? `@${username}` : null;
  
  console.log(`User started bot: chatId=${chatId}, username=${telegramUsername}`);
  
  if (telegramUsername) {
    try {
      await pool.query(
        "UPDATE users SET telegram_chat_id = $1 WHERE telegram_username = $2",
        [chatId, telegramUsername]
      );
      console.log(`Stored chat_id ${chatId} for ${telegramUsername}`);
    } catch (error) {
      console.error("Error storing chat_id:", error);
    }
  }
  
  bot.sendMessage(chatId, "Привет! Вы подключены к боту магазина. Теперь вы будете получать уведомления о регистрации, входе и заказах.");
});

async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        telegram_username VARCHAR(255),
        telegram_chat_id BIGINT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    try {
      await pool.query(`
        ALTER TABLE users ADD COLUMN IF NOT EXISTS telegram_chat_id BIGINT
      `);
    } catch (error) {

      console.log("Note: telegram_chat_id column check:", error.message);
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        telegram_username VARCHAR(255),
        items JSONB,
        total_price DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

async function sendTelegramMessage(telegramUsername, message) {
  try {
    if (!telegramUsername || !telegramUsername.trim()) {
      return;
    }

    const username = telegramUsername.replace("@", "");
    const usernameWithAt = telegramUsername.startsWith("@") ? telegramUsername : `@${username}`;
    
    console.log(`Attempting to send message to ${usernameWithAt}: ${message}`);
    
    try {
      const result = await pool.query(
        "SELECT telegram_chat_id FROM users WHERE telegram_username = $1",
        [usernameWithAt]
      );
      
      if (result.rows.length > 0 && result.rows[0].telegram_chat_id) {
        const chatId = result.rows[0].telegram_chat_id;
        await bot.sendMessage(chatId, message);
        console.log(`Successfully sent message to chat_id ${chatId} (${usernameWithAt})`);
        return;
      } else {
        console.log(`No chat_id found for ${usernameWithAt}. User needs to start the bot with /start first.`);
        console.log(`To receive messages, user ${usernameWithAt} should send /start to the bot.`);
      }
    } catch (dbError) {
      console.error("Database error when looking up chat_id:", dbError);
    }
    
    console.log(`Could not send message to ${usernameWithAt}. User must start the bot first.`);
 
    if (groupChatId) {
      try {
        const adminMessage = `(Fallback) Unable to deliver to ${usernameWithAt}. Message:\n${message}`;
        await bot.sendMessage(groupChatId, adminMessage);
        console.log(`Sent fallback message to group ${groupChatId}`);
        return;
      } catch (grpErr) {
        console.error("Error sending fallback message to group:", grpErr);
      }
    }
    
  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }
}

app.post("/api/signup", async (req, res) => {
  try {
    const { username, password, telegramUsername } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Имя пользователя и пароль обязательны" });
    }
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Пользователь с таким именем уже существует" });
    }

    const bcrypt = require("bcrypt");
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      "INSERT INTO users (username, password_hash, telegram_username) VALUES ($1, $2, $3) RETURNING id, username, telegram_username",
      [username, passwordHash, telegramUsername || null]
    );

    const user = result.rows[0];

    if (telegramUsername && telegramUsername.trim()) {
      await sendTelegramMessage(
        telegramUsername,
        `Привет! Вы успешно зарегистрировались в нашем магазине. Ваш аккаунт: ${username}`
      );
    }

    res.json({ success: true, user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Имя пользователя и пароль обязательны" });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Неверное имя пользователя или пароль" });
    }

    const user = result.rows[0];

    const bcrypt = require("bcrypt");
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Неверное имя пользователя или пароль" });
    }

    if (user.telegram_username && user.telegram_username.trim()) {
      await sendTelegramMessage(
        user.telegram_username,
        `Вы успешно вошли в свой аккаунт: ${username}`
      );
    }

    res.json({
      success: true,
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.post("/api/order", async (req, res) => {
  try {
    const { telegramUsername, items } = req.body;

    if (!telegramUsername || !items || items.length === 0) {
      return res.status(400).json({ error: "Неверные данные заказа" });
    }

    const totalPrice = items.reduce((total, item) => {
      const priceStr = item.price.replace(/\s/g, "").replace("₽", "").replace("руб.", "").trim();
      return total + (parseFloat(priceStr) || 0);
    }, 0);

    const result = await pool.query(
      "INSERT INTO orders (telegram_username, items, total_price) VALUES ($1, $2, $3) RETURNING id",
      [telegramUsername, JSON.stringify(items), totalPrice]
    );

    const orderSummary = items
      .map((item) => `- ${item.name} (${item.color || "—"}, ${item.memory || "—"}) - ${item.price}`)
      .join("\n");

    await sendTelegramMessage(
      telegramUsername,
      `Ваш заказ оформлен!\n\nТовары:\n${orderSummary}\n\nИтого: ${totalPrice.toLocaleString("ru-RU")} руб.`
    );

    res.json({ success: true, orderId: result.rows[0].id });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

const PORT = process.env.PORT || 3001;

