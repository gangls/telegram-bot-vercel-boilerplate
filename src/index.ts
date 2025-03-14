import { Telegraf } from 'telegraf';
import {HttpsProxyAgent} from 'https-proxy-agent'

import { about, start } from './commands';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf(BOT_TOKEN, {
    telegram: {
        agent: new HttpsProxyAgent(process.env.PROXY_URL||"http://127.0.0.1:54706")
    }
});

bot.telegram.setMyCommands([
    {
      command: 'about',
      description: 'Test command',
    },
    {
      command: 'start',
      description: 'Test command',
    },
  ]);

bot.command('start', start());
bot.command('about', about());
bot.on('message', greeting());

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
// //dev mode
ENVIRONMENT !== 'production' && development(bot);
