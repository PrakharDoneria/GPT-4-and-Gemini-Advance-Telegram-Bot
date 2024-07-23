# AI Bot Telegram Bot

This Telegram bot allows you to interact with the GPT-4 and Gemini Advance APIs from RapidAPI. Follow the steps below to get started and learn how to use the bot effectively.

## Setup

### Prerequisites

- Node.js installed
- A MongoDB instance (local or cloud)
- A RapidAPI account with access to the GPT-4 and Gemini Advance APIs
- A Telegram Bot Token from BotFather

### Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

```plaintext
BOT_TOKEN=your-telegram-bot-token
MONGODB_URI=your-mongodb-uri
```

### Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install telegraf mongoose axios dotenv
```

### Run the Bot

Start the bot by running:

```bash
node index.js
```

## Usage

### /start

Starts the bot and provides a welcome message with detailed usage instructions.
