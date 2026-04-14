# Telegram Bot Setup Guide

## Overview
Your store application has Telegram bot integration built in. When users sign up or place orders, they can receive notifications via Telegram. Here's how to set it up and make it work.

## Step 1: Create a Telegram Bot

1. **Open Telegram** and search for `@BotFather`
2. **Send `/start`** to BotFather
3. **Send `/newbot`** to create a new bot
4. **Follow the prompts:**
   - Choose a name for your bot (e.g., "Store Bot")
   - Choose a username for your bot (must end with "bot", e.g., "my_store_bot")
5. **Copy the token** that BotFather gives you - it will look like:
   ```
   123456789:ABCDefGHIjklmnopqrstuvwxyz1234567890
   ```

## Step 2: Configure Your Server

1. **Create a `.env` file** in the `server/` directory (copy from `.env.example`):
   ```bash
   cp server/.env.example server/.env
   ```

2. **Edit `server/.env`** and add your bot token:
   ```
   TELEGRAM_BOT_TOKEN=your_token_here
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=store_db
   DB_PASSWORD=your_password
   DB_PORT=5432
   PORT=3001
   ```

3. **Start your server:**
   ```bash
   cd server
   npm install
   node server.js
   ```

## Step 3: How Users Receive Messages

### The Flow:
1. **User signs up or places an order** with their Telegram username (e.g., `@username`)
2. **User must send `/start`** to your bot on Telegram first
3. **Bot captures the user's chat_id** and stores it in the database
4. **When the user makes an order**, the server looks up their `chat_id` and sends them a notification via the bot

### Important: Users Must Start the Bot First
Users need to:
1. Search for your bot on Telegram (using the username you created)
2. Send the `/start` command
3. They'll receive a confirmation message
4. Now they can place orders and receive notifications

## Step 4: Test the Integration

### Test Sign Up:
1. Go to your signup page
2. Create an account with username and password
3. When prompted for Telegram username, enter it (e.g., `@yourusername`)
4. Make sure you've already sent `/start` to your bot in Telegram
5. You should receive a confirmation message

### Test Order:
1. Log in to your account
2. Add items to cart and proceed to checkout
3. Enter your Telegram username in the popup
4. Complete the order
5. You should receive an order confirmation via Telegram

## Troubleshooting

### "No chat_id found for @username"
**Solution:** The user hasn't sent `/start` to your bot yet. They need to:
1. Find your bot on Telegram
2. Tap `/start`
3. Wait for confirmation
4. Then they can place orders

### Bot token is invalid or not working
**Solution:** 
1. Double-check your token in `.env`
2. Verify the token hasn't expired (tokens don't expire, but double-check you copied it correctly)
3. Restart your server after updating `.env`

### Messages not sending
**Check server logs for:**
- Bot token is set: `echo $TELEGRAM_BOT_TOKEN` (Windows: `echo %TELEGRAM_BOT_TOKEN%`)
- Database connection is working
- User has started the bot (`/start` command)

## Sending to a Group Chat (admin notifications)

If you want undelivered messages (or general notifications) to go to a group or channel, you can configure a group chat id. The app now supports a `TELEGRAM_GROUP_CHAT_ID` fallback: when a user's `chat_id` isn't found the server will send the message to the configured group.

How to get the group chat id:

1. Create a group (or supergroup) in Telegram and invite your bot to the group.
2. Send any message in that group (from any account).
3. Use the `getUpdates` method to read recent messages and see the group's `chat.id`.

Example (replace `YOUR_TOKEN`):

```bash
curl "https://api.telegram.org/botYOUR_TOKEN/getUpdates" -s | jq
```

Look for the `chat` object in the JSON and find the `id` (supergroup ids look like `-1001234567890`).

Alternative ways to obtain the id:
- Use the bot's server logs: the running bot receives messages and you can log `msg.chat.id` from an `on('message')` handler.
- Use a helper bot such as `@userinfobot` or `@RawDataBot` by forwarding a message from the group or adding the helper bot to the group.

Once you have the id, add it to `server/.env`:

```
TELEGRAM_GROUP_CHAT_ID=-1001234567890
```

Restart the server after editing `.env`.

## Code Structure

### Server Endpoints:
- **POST `/api/signup`** - Creates user account, sends welcome message
- **POST `/api/login`** - Logs in user, sends login notification
- **POST `/api/order`** - Creates order, sends order confirmation

### Key Function:
```javascript
async function sendTelegramMessage(telegramUsername, message)
```
This function:
1. Takes username from the form (e.g., `@username`)
2. Looks up the user's `chat_id` in the database
3. Sends a message via the Telegram bot API
4. Logs any errors if the user hasn't started the bot

## Database Schema

Users table stores:
```sql
- id (auto-increment)
- username (store username)
- password_hash
- telegram_username (e.g., @username)
- telegram_chat_id (populated when user sends /start to bot)
- created_at (timestamp)
```

Orders table stores:
```sql
- id (auto-increment)
- user_id (references users table)
- telegram_username (user's telegram handle)
- items (JSON array of cart items)
- total_price (calculated from items)
- created_at (timestamp)
```

## Security Notes

⚠️ **IMPORTANT:**
- Never commit your `.env` file to git (already in `.gitignore`)
- Keep your bot token secret - never share it publicly
- The bot token acts like a password for your bot

## Next Steps

1. Create your bot with BotFather
2. Add the token to `.env`
3. Restart the server
4. Have users send `/start` to your bot
5. Users can now sign up and place orders with Telegram notifications!
