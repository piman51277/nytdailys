import { ChatInputCommandInteraction } from "discord.js";
import { CommandEntry } from "../types";

export default <CommandEntry>{
  name: "ping",
  description: "Replies with pong!",
  handler: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply("pong!");
  },
};
