import { Message } from "discord.js";

export default {
  target: (content: string): boolean => {
    return content === "ping";
  },

  handle: async (msg: Message): Promise<void> => {
    msg.reply("pong");
  },
};
