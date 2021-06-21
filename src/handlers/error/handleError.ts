import TelegramBot, { KeyboardButton, Message } from "node-telegram-bot-api";

function handleError(bot: TelegramBot, msg: Message) {
  const keyboardButton: KeyboardButton[] = [
    {
      text: "/start",
    },
  ];

  return bot.sendMessage(
    msg.chat.id,
    "Invalid message. Press start button to continue",
    {
      reply_markup: {
        keyboard: [keyboardButton],
      },
    }
  );
}

export default handleError;
