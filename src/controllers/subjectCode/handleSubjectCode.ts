import TelegramBot from "node-telegram-bot-api";

import UserState from "../../state/UserState";
import handleError from "../error/handleError";
import s3 from "../../services/s3/s3.service";

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

    if (!msg.text?.includes("MG")) {
      return bot.sendMessage(
        msg.chat.id,
        "Sorry. The question paper is not available",
        {
          reply_markup: {
            remove_keyboard: true,
          },
        }
      );
    }

    s3.getObject(
      {
        Bucket: process.env["AWS_S3_BUCKET_NAME"] as string,
        Key: `MG8591.pdf`,
      },
      function (err, data) {
        if (err) throw err;
        bot.sendDocument(msg.chat.id, data.Body as Buffer);
      }
    );

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
