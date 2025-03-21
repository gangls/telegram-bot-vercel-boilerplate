import { Context } from 'telegraf';
import createDebug from 'debug';

import { author, name, version } from '../../package.json';

const debug = createDebug('bot:about_command');

const about = () => async (ctx: Context) => {
  const keyboard = {
    inline_keyboard: [
      [{ text: '订阅', callback_data: 'button1' },{ text: '取消订阅', callback_data: 'button1' }],
    ]
  };

  const message = `*${name} ${version}*\n${author}`;
  debug(`Triggered "about" command with message \n${message}`);
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown', reply_markup: keyboard });
};

export { about };
