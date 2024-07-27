require('dotenv').config();
const { Telegraf } = require('telegraf');
const mongoose = require('mongoose');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

const UserSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },
  apiKey: String,
  attempts: { type: Number, default: 0 }
});

const User = mongoose.model('User', UserSchema);

const bot = new Telegraf(process.env.BOT_TOKEN);

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('working');
});

const helpMessage = `
Welcome to the AI Bot! Follow these steps to get started:

1. Subscribe to the API from RapidAPI:
   https://rapidapi.com/yashdoneria/api/gpt-4-and-gemini-advance/

2. Save your API key using the /save command:
   /save YOUR_API_KEY
   Note: You can only save or update your API key up to 3 times.

3. Use the following commands to interact with the bot:
   /gemini {your prompt}
   /gpt {your prompt}

4. For downloading the app, use the /download command.

Examples:
   /gemini Tell me a joke
   /gpt What is the capital of France?
   /download

If you encounter any issues, please ensure your API key is valid and you haven't exceeded your daily limit.
`;

bot.start(async (ctx) => {
  try {
    await ctx.reply(helpMessage);
  } catch (error) {
    console.error('Error in /start command:', error);
    await ctx.reply('An error occurred while starting the bot. Please try again.');
  }
});

bot.help(async (ctx) => {
  try {
    await ctx.reply(helpMessage);
  } catch (error) {
    console.error('Error in /help command:', error);
    await ctx.reply('An error occurred while displaying help. Please try again.');
  }
});

bot.command('save', async (ctx) => {
  try {
    const userId = ctx.from.id;
    const apiKey = ctx.message.text.split(' ')[1];

    if (!apiKey) {
      return ctx.reply('Please provide an API key with the command, like this: /save YOUR_API_KEY');
    }

    await ctx.replyWithChatAction('typing');

    let user = await User.findOne({ userId });

    if (!user) {
      user = new User({ userId, apiKey, attempts: 1 });
      await user.save();
      await ctx.reply('API key saved! You can now use the /gemini and /gpt commands.');
    } else {
      if (user.attempts >= 3) {
        return ctx.reply('You have reached the maximum number of attempts to save your API key.');
      }

      user.apiKey = apiKey;
      user.attempts += 1;
      await user.save();

      const attemptsLeft = 3 - user.attempts;
      await ctx.reply(`API key updated! You can now use the /gemini and /gpt commands. You have ${attemptsLeft} attempt(s) left.`);
    }
  } catch (error) {
    console.error('Error in /save command:', error);
    await ctx.reply('An error occurred while saving your API key. Please try again.');
  }
});

async function handleApiRequest(ctx, endpoint, prompt) {
  try {
    const userId = ctx.from.id;
    const user = await User.findOne({ userId });

    if (!user) {
      return ctx.reply('Please save your API key first using the /save command.');
    }

    const options = {
      method: 'GET',
      url: `https://gpt-4-and-gemini-advance.p.rapidapi.com/${endpoint}`,
      params: { prompt },
      headers: {
        'x-rapidapi-key': user.apiKey,
        'x-rapidapi-host': 'gpt-4-and-gemini-advance.p.rapidapi.com'
      }
    };

    await ctx.replyWithChatAction('typing');

    try {
      const response = await axios.request(options);
      await ctx.reply(response.data.reply);
    } catch (error) {
      console.error('Error making API request:', error);

      if (error.response && error.response.status === 429) {
        await ctx.reply('Seems daily limit exceeded. Please try tomorrow or upgrade your plan: https://rapidapi.com/yashdoneria/api/gpt-4-and-gemini-advance/');
      } else {
        await ctx.reply('An error occurred while processing your request. Please try again.');
      }
    }
  } catch (error) {
    console.error('Error in handleApiRequest:', error);
    await ctx.reply('An error occurred while preparing your request. Please try again.');
  }
}

bot.command('gemini', (ctx) => {
  try {
    const prompt = ctx.message.text.split(' ').slice(1).join(' ');
    handleApiRequest(ctx, 'geminiAdvance', prompt);
  } catch (error) {
    console.error('Error in /gemini command:', error);
    ctx.reply('An error occurred while handling your /gemini command. Please try again.');
  }
});

bot.command('gpt', (ctx) => {
  try {
    const prompt = ctx.message.text.split(' ').slice(1).join(' ');
    handleApiRequest(ctx, 'gpt4', prompt);
  } catch (error) {
    console.error('Error in /gpt command:', error);
    ctx.reply('An error occurred while handling your /gpt command. Please try again.');
  }
});

bot.command('download', async (ctx) => {
  try {
    await ctx.reply('You can download the app from the following link: http://t.me/gpt4ngemini_bot/app');
  } catch (error) {
    console.error('Error in /download command:', error);
    await ctx.reply('An error occurred while handling your /download request. Please try again.');
  }
});

bot.launch()
  .then(() => console.log('Bot started'))
  .catch(error => console.error('Error launching the bot:', error));

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});
