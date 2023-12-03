import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from "./env/env";

// create the bot client
export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// listen for the ready event
client.on(Events.ClientReady, () => {
  console.log("Bot is ready");
});

// login
client.login(config.DISCORD_TOKEN);
