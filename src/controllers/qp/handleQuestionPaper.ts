import TelegramBot, { KeyboardButton } from "node-telegram-bot-api";

import subjects from "../../data/subjectCodes";
import UserState from "../../state/UserState";

function handleQuestionPaper(
  bot: TelegramBot,
  msg: TelegramBot.Message,
  user: UserState
) {
  try {
    // const subjectCode = msg.text?.split("_")[1]?.toUpperCase() || "";
    // const subjectCodeRegex = /^[A-Z]{2}[0-9]{4}$/;
    user.userRequest = "QP";

    const keyboardButtons: KeyboardButton[] = [];

    subjects.map(({ code, shortName }) => {
      keyboardButtons.push({ text: `${code} - ${shortName}` });
    });

    bot.sendMessage(msg.chat.id, "Choose the subject:", {
      reply_markup: {
        keyboard: [keyboardButtons],
      },
    });

    console.log(user);
  } catch (error) {
    console.error(error);
  }
}

export default handleQuestionPaper;
