import { Interaction } from "discord.js";

export type CommandHandler = (interaction: Interaction) => Promise<void>;

export interface Command {
  name: string;
  description: string;
}

export interface CommandEntry extends Command {
  handler: CommandHandler;
}
