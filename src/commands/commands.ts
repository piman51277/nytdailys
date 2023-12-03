import { REST, Routes } from "discord.js";
import { config } from "../env/env";
import { Command, CommandEntry } from "./types";
import { client } from "../bot";

const commandEntries: CommandEntry[] = [];

//strip the handler from the command entry
const commands: Command[] = commandEntries.map((entry) => {
  return {
    name: entry.name,
    description: entry.description,
  };
});

//reload the commands
const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);
(async () => {
  try {
    await rest.put(Routes.applicationCommands(config.CLIENT_ID), {
      body: commands,
    });

    console.log("Reloaded application (/) commands.");
  } catch (error: any) {
    throw new Error(
      "Failed to reload application (/) commands.\n" + error.message
    );
  }
})();

//command router
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  //TODO: this is a linear search, could be improved using dict
  const command = commandEntries.find(
    (cmd) => cmd.name === interaction.commandName
  );
  if (!command) return;

  try {
    await command.handler(interaction);
  } catch (error: any) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});
