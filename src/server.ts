import express from "express";
import dotenv from "dotenv";
import cors from "cors";

(async () => {
  dotenv.config();

  const app = express();
  const PORT = parseInt(process.env["PORT"] as string, 10);
  const TG_BOT_API_TOKEN = process.env["TG_BOT_API_TOKEN"] as string;

  try {
    app.use(express.json());
    app.use(cors());

    app.get("/", (_, res) => {
      res.status(200).send("Hello World");
    });

    app.listen(PORT, () => console.info(`Server started at port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
})();
