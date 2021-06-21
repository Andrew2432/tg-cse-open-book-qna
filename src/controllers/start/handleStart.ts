import TelegramBot, { KeyboardButton } from "node-telegram-bot-api";

import UserState from "../../state/UserState";

function handleStart(
  bot: TelegramBot,
  msg: TelegramBot.Message,
  user: UserState
) {
  const keyboardButtons: KeyboardButton[] = [
    {
      text: "Question Paper",
    },
    {
      text: "Answer",
    },
  ];

  console.log(user);
  try {
    bot.sendMessage(msg.chat.id, "Hello. Choose what you want below:", {
      reply_markup: {
        keyboard: [keyboardButtons],
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export default handleStart;
