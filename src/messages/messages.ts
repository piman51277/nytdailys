import { Events, Message } from "discord.js";
import { client } from "../bot";
import { MessageHandler } from "./types";

const handlers: MessageHandler[] = [];

client.on(Events.MessageCreate, (msg: Message) => {
  const { author, content } = msg;

  if (author.bot) return;

  for (const handler of handlers) {
    if (handler.target(content)) {
      handler.handle(msg);
    }
  }
});
