import { Telegraf } from 'telegraf';
import {HttpsProxyAgent} from 'https-proxy-agent'

import { about } from './commands';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf(BOT_TOKEN);

bot.telegram.setMyCommands([
    {
      command: 'about',
      description: 'Test command',
    },
  ]);

bot.command('about', about());
bot.on('message', greeting());

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
// //dev mode
ENVIRONMENT !== 'production' && development(bot);
