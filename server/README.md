# Store Backend API - Setup Guide

This guide will walk you through setting up the backend server with PostgreSQL database and Telegram bot integration.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download here](https://www.postgresql.org/download/)
- **npm** (comes with Node.js)
- A Telegram account

## Step 1: Install Dependencies

Navigate to the `server` directory and install the required packages:

```bash
cd server
npm install
```

This will install:
- `express` - Web framework
- `pg` - PostgreSQL client
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `node-telegram-bot-api` - Telegram bot API
- `bcrypt` - Password hashing

## Step 2: Set Up PostgreSQL Database

You can create the database using either the command line (psql) or pgAdmin GUI. Choose the method you prefer.

### Method A: Using pgAdmin (GUI - Recommended for Beginners)

#### 2.1.1 Install and Open pgAdmin

1. **Install pgAdmin** (if not already installed):
   - pgAdmin usually comes bundled with PostgreSQL installation
   - If not, download it from [pgAdmin website](https://www.pgadmin.org/download/)
   - Launch pgAdmin from your applications menu or Start menu

2. **Connect to PostgreSQL Server**:
   - When you first open pgAdmin, you'll see the pgAdmin interface
   - In the left sidebar, expand **Servers**
   - If you see your PostgreSQL server listed, click on it
   - If prompted, enter your PostgreSQL master password (the one you set during PostgreSQL installation)
   - If you don't see a server, you'll need to add one:
     - Right-click on **Servers** → **Register** → **Server**
     - In the **General** tab, enter a name (e.g., "PostgreSQL")
     - In the **Connection** tab:
       - **Host name/address**: `localhost`
       - **Port**: `5432` (default PostgreSQL port)
       - **Maintenance database**: `postgres`
       - **Username**: `postgres` (or your PostgreSQL username)
       - **Password**: Your PostgreSQL password
     - Click **Save**

#### 2.1.2 Create the Database

1. **Expand the Server**:
   - In the left sidebar, expand your PostgreSQL server
   - Expand **Databases**

2. **Create New Database**:
   - Right-click on **Databases**
   - Select **Create** → **Database...**

3. **Configure Database**:
   - In the **General** tab:
     - **Database**: Enter `store_db`
     - **Owner**: Leave as `postgres` (or select your user)
   - In the **Definition** tab:
     - **Encoding**: `UTF8` (default)
     - **Template**: `template0` or `template1` (default)
   - Click **Save**

4. **Verify Database Creation**:
   - You should now see `store_db` listed under **Databases** in the left sidebar
   - Click on `store_db` to select it
   - The database is ready to use!


### Method B: Using Command Line (psql)

#### 2.2.1 Create the Database

Open your PostgreSQL command line tool (psql):

```sql
-- Connect to PostgreSQL (you may need to enter your postgres user password)
psql -U postgres

-- Create the database
CREATE DATABASE store_db;

-- Verify the database was created
\l
```

#### 2.2.2 (Optional) Create a Dedicated User

For better security, create a dedicated database user:

```sql
-- Create a new user
CREATE USER store_user WITH PASSWORD 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE store_db TO store_user;

-- Connect to the new database
\c store_db

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO store_user;
```

## Step 3: Configure Environment Variables

### 3.1 Create .env File

In the `server` directory, create a `.env` file:

```bash
# On Windows (PowerShell)
New-Item .env

# On Linux/Mac
touch .env
```

### 3.2 Add Configuration

Copy the following template into your `.env` file and fill in your values:

```env
# Database Configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=store_db
DB_PASSWORD=your_postgres_password
DB_PORT=5432

# Telegram Bot Configuration
# Get your bot token from @BotFather (see Step 4)
TELEGRAM_BOT_TOKEN=your_bot_token_here

# Server Port
PORT=3001
```

**Important Notes:**
- Replace `your_postgres_password` with your actual PostgreSQL password
- Replace `your_bot_token_here` with your Telegram bot token (see Step 4)
- If you created a dedicated user, use that username instead of `postgres`

## Step 4: Set Up Telegram Bot

### 4.1 Create a Bot with BotFather

1. Open Telegram and search for `@BotFather`
2. Start a conversation with BotFather
3. Send the command: `/newbot`
4. Follow the prompts:
   - Choose a name for your bot (e.g., "My Store Bot")
   - Choose a username for your bot (must end with `bot`, e.g., "mystore_bot")
5. BotFather will give you a **bot token** that looks like:
   ```
   123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   ```

### 4.2 Add Bot Token to .env

Copy the bot token and paste it into your `.env` file:

```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
```

### 4.3 Important: Telegram Bot Limitations

**Current Implementation:**
The current implementation logs messages that would be sent. For the bot to actually send messages to users, users must first start a conversation with your bot.

**For Production Use:**
To enable full Telegram messaging functionality, you need to:

1. **Store chat_id when users start the bot:**
   - Add a `/start` command handler
   - When a user sends `/start` to your bot, store their `chat_id` in the database
   - Use the stored `chat_id` to send messages

2. **Example implementation:**
   ```javascript
   // In server.js, add polling mode
   const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
     polling: true
   });

   // Handle /start command
   bot.onText(/\/start/, async (msg) => {
     const chatId = msg.chat.id;
     const username = msg.from.username;
     
     // Store chat_id in database
     await pool.query(
       "UPDATE users SET telegram_chat_id = $1 WHERE telegram_username = $2",
       [chatId, `@${username}`]
     );
     
     bot.sendMessage(chatId, "Welcome! You're now connected.");
   });
   ```

3. **Update sendTelegramMessage function:**
   ```javascript
   async function sendTelegramMessage(telegramUsername, message) {
     try {
       const result = await pool.query(
         "SELECT telegram_chat_id FROM users WHERE telegram_username = $1",
         [telegramUsername]
       );
       
       if (result.rows.length > 0 && result.rows[0].telegram_chat_id) {
         await bot.sendMessage(result.rows[0].telegram_chat_id, message);
       } else {
         console.log(`User ${telegramUsername} hasn't started the bot yet`);
       }
     } catch (error) {
       console.error("Error sending Telegram message:", error);
     }
   }
   ```

## Step 5: Initialize the Database

The server will automatically create the necessary tables when it starts. However, you can verify the setup:

### 5.1 Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

### 5.2 Verify Tables Were Created

#### Using pgAdmin:

1. **Open pgAdmin** and connect to your PostgreSQL server
2. **Expand the database**:
   - Expand **Servers** → Your server → **Databases** → `store_db` → **Schemas** → **public** → **Tables**
3. **Check tables**:
   - You should see two tables listed:
     - `users` - Stores user accounts
     - `orders` - Stores order information
4. **View table structure** (optional):
   - Right-click on a table (e.g., `users`) → **Properties**
   - Go to **Columns** tab to see the table structure
   - Or right-click → **View/Edit Data** → **First 100 Rows** to see data

#### Using Command Line:

```sql
psql -U postgres -d store_db

-- List all tables
\dt

-- Check users table structure
\d users

-- Check orders table structure
\d orders
```

You should see two tables:
- `users` - Stores user accounts
- `orders` - Stores order information

## Step 6: Test the Setup

### 6.1 Test Database Connection

The server should start without errors. You should see:

```
Database initialized successfully
Server running on port 3001
```

### 6.2 Test API Endpoints

You can test the API using curl, Postman, or your frontend application.

**Test Signup:**
```bash
curl -X POST http://localhost:3001/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123",
    "telegramUsername": "@testuser"
  }'
```

**Test Login:**
```bash
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }'
```

**Test Order:**
```bash
curl -X POST http://localhost:3001/api/order \
  -H "Content-Type: application/json" \
  -d '{
    "telegramUsername": "@testuser",
    "items": [
      {
        "name": "iPhone 17 Pro Max",
        "price": "150 000₽",
        "color": "Белый",
        "memory": "256 ГБ",
        "image": "/whiteiphone.png"
      }
    ]
  }'
```

## Step 7: Connect Frontend to Backend

Make sure your frontend is configured to connect to the backend:

1. The frontend should make requests to `http://localhost:3001`
2. Ensure CORS is enabled (already configured in `server.js`)
3. Start your frontend development server:
   ```bash
   npm run dev
   ```

## Troubleshooting

### Database Connection Errors

**Error: "password authentication failed"**
- Check your `.env` file has the correct `DB_PASSWORD`
- Verify PostgreSQL is running: `pg_isready`

**Error: "database does not exist"**
- Make sure you created the database: `CREATE DATABASE store_db;`
- Check the `DB_NAME` in your `.env` file

**Error: "connection refused"**
- Verify PostgreSQL is running
- Check `DB_HOST` and `DB_PORT` in `.env`
- Default PostgreSQL port is 5432

### Telegram Bot Errors

**Error: "Unauthorized" or "Invalid token"**
- Verify your bot token is correct in `.env`
- Make sure there are no extra spaces in the token
- Get a new token from @BotFather if needed

**Messages not being sent:**
- Users must start a conversation with your bot first
- Implement chat_id storage (see Step 4.3) for production use
- Check server logs for error messages

### Port Already in Use

**Error: "Port 3001 is already in use"**
- Change the `PORT` in `.env` to a different port (e.g., 3002)
- Or stop the process using port 3001:
  ```bash
  # Windows
  netstat -ano | findstr :3001
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -ti:3001 | xargs kill
  ```

## Security Notes

1. **Never commit `.env` file** - It contains sensitive information
2. **Use strong passwords** - For both database and user accounts
3. **Hash passwords** - Already implemented using bcrypt
4. **Use HTTPS in production** - For secure API communication
5. **Validate input** - Add more validation as needed
6. **Rate limiting** - Consider adding rate limiting for production

## Production Deployment

For production deployment:

1. Use environment variables from your hosting provider
2. Set up SSL/HTTPS
3. Use a production-grade PostgreSQL database (e.g., AWS RDS, Heroku Postgres)
4. Implement proper error handling and logging
5. Set up monitoring and alerts
6. Implement the full Telegram bot chat_id storage (see Step 4.3)
7. Use a process manager like PM2 for Node.js
8. Set up database backups

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## Support

If you encounter issues:

1. Check the server logs for error messages
2. Verify all environment variables are set correctly
3. Test database connection separately
4. Test Telegram bot token with @BotFather
5. Check that all dependencies are installed

---

**Happy coding!** 🚀
