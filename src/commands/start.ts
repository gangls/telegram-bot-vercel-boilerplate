import { Context } from 'telegraf';
import createDebug from 'debug';

import { author, name, version } from '../../package.json';

const debug = createDebug('bot:about_command');

const start = () => async (ctx: Context) => {
  const keyboard = {
    inline_keyboard: [
      [{ text: '订阅', callback_data: 'button1' },{ text: '取消订阅', callback_data: 'button1' }],
    ]
  };

  const welcomeText = `
🌟 *欢迎来到超级机器人！* 🌟

我是你的智能助手，可以帮你完成以下任务：
- 📅 管理日程
- 🌐 搜索信息
- 🎮 玩游戏
- 🛠️ 提供实用工具

点击下面的按钮开始吧！
`;

  const message = `*${name} ${version}*\n${author}`;
  debug(`Triggered "about" command with message \n${message}`);
  await ctx.replyWithMarkdownV2(welcomeText, { parse_mode: 'Markdown', reply_markup: keyboard });
};

export { start };
