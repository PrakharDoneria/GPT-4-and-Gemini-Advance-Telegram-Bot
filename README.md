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

```plaintext
Welcome to the AI Bot! Follow these steps to get started:

1. Subscribe to the API from RapidAPI:
   https://rapidapi.com/yashdoneria/api/gpt-4-and-gemini-advance/

2. Save your API key using the /save command:
   /save YOUR_API_KEY
   Note: You can only save or update your API key up to 3 times.

3. Use the following commands to interact with the bot:
   /gemini {your prompt}
   /gpt {your prompt}

Examples:
   /gemini Tell me a joke
   /gpt What is the capital of France?

If you encounter any issues, please ensure your API key is valid and you haven't exceeded your daily limit.
```

### /help

Displays the same usage instructions as the `/start` command.

### /save {API_KEY}

Saves your RapidAPI key. You can save or update your API key up to 3 times.

```plaintext
/save YOUR_API_KEY
```

If you exceed the limit, you will be notified and won't be able to save a new key.

### /gemini {prompt}

Sends a prompt to the Gemini Advance API and returns the response.

```plaintext
/gemini Tell me a joke
```

### /gpt {prompt}

Sends a prompt to the GPT-4 API and returns the response.

```plaintext
/gpt What is the capital of France?
```

## Error Handling

- If you provide an invalid API key or exceed your daily limit, you will receive a message indicating the issue.
- If any errors occur during API requests, you will be notified to try again.

## Example Responses

### /gemini Tell me you are gemini advance in sarcasm 

```plaintext
I'm a powerful AI model with a massive context window, a flair for creative collaboration, and exclusive features to supercharge your logical reasoning and coding skills. Want to explore 1500 pages of information or get up-to-date search snippets? I'm your bot. 😉
```

### /gpt Tell me you are GPT4 in sarcasm

```plaintext
Oh sure, because sarcasm is definitely the most effective way to prove my capabilities. Just what I always wanted to showcase my advanced artificial intelligence skills.
```

## Troubleshooting

If you encounter any issues:

1. Ensure your API key is valid.
2. Check if you have exceeded your daily limit.
3. Verify your MongoDB connection.
4. Make sure your environment variables are correctly set up.

For further assistance, refer to the documentation of the respective libraries and APIs you are using.

## RapidAPI Link

To subscribe to the GPT-4 and Gemini Advance APIs, visit the following link:
[RapidAPI GPT-4 and Gemini Advance API](https://rapidapi.com/yashdoneria/api/gpt-4-and-gemini-advance/)
