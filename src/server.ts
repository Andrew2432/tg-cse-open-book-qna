import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import TelegramBot from "node-telegram-bot-api";
import UserState from "./state/UserState";

import handleRequest from "./handlers";

(async () => {
  dotenv.config();

  const app = express();
  const PORT = parseInt(process.env["PORT"] as string, 10);
  const TG_BOT_API_TOKEN = process.env["TG_BOT_API_TOKEN"] as string;

  const bot = new TelegramBot(TG_BOT_API_TOKEN, { polling: true });
  const users: UserState[] = [];

  try {
    app.use(express.json());
    app.use(cors());

    app.get("/", (_, res) => {
      res.status(200).send("Hello World");
    });

    bot.on("message", (msg) => {
      const existingUser = users.filter(
        (user) => user.userId === msg.chat.id
      )[0];

      if (existingUser) {
        handleRequest(bot, msg, existingUser);
      } else {
        const newUser = new UserState(msg.chat.id);
        handleRequest(bot, msg, newUser);
      }

      users.push(new UserState(msg.chat.id));
    });

    app.listen(PORT, () => console.info(`Server started at port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
})();
