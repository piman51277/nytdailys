import { Message } from "discord.js";

export interface MessageHandler {
  //is this message a target for this handler?
  target: (content: string) => boolean;

  //handle the message
  handle: (msg: Message) => Promise<void>;
}
