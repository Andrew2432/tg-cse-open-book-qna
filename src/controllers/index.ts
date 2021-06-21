import TelegramBot from "node-telegram-bot-api";

import handleQuestionPaper from "./qp/handleQuestionPaper";
import handleStart from "./start/handleStart";
import UserState from "../state/UserState";
import handleSubjectCode from "./subjectCode/handleSubjectCode";
import handleError from "./error/handleError";

function handleRequest(
  bot: TelegramBot,
  msg: TelegramBot.Message,
  user: UserState
) {
  try {
    if (msg.text?.includes("start")) {
      return handleStart(bot, msg, user);
    }

    if (msg.text?.includes("qp") || msg.text?.includes("Question")) {
      return handleQuestionPaper(bot, msg, user);
    }

    if (msg.text?.match(/^[A-Z]{2}[0-9]{4}/)) {
      return handleSubjectCode(bot, msg, user);
    }

    throw new Error("Invalid message");
  } catch (error) {
    console.error(error);
    return handleError(bot, msg);
  }
}

export default handleRequest;
