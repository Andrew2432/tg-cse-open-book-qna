import TelegramBot from "node-telegram-bot-api";

import UserState from "../../state/UserState";
import handleError from "../error/handleError";

function handleSubjectCode(
  bot: TelegramBot,
  msg: TelegramBot.Message,
  user: UserState
) {
  try {
    if (!user.userId || !user.userRequest) {
      throw new Error("Invalid state");
    }

    user.userSubjectCode = msg.text as string;

    console.log(user);

    return bot.sendMessage(msg.chat.id, "We will send the question paper", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
  } catch (error) {
    console.error(error);
    return handleError(bot, msg);
  }
}

export default handleSubjectCode;
