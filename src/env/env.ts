import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { parse } from "dotenv";
import Joi from "joi";

// preference order for env files - first one found is used
const FILEPRIORITY = ["prod.env", "dev.env", "local.env"];

// find the first env file that exists
let targetFile = "";
for (const filename of FILEPRIORITY) {
  const filePath = resolve("./", filename);
  if (existsSync(filePath)) {
    targetFile = filePath;
    break;
  }
}
if (!targetFile) {
  throw new Error("Cannot start - No env file found");
}

// load the env file
const rawConfig = readFileSync(targetFile);
const configuration = parse(rawConfig);

// validates the extracted env variables
const configSchema = Joi.object({
  DISCORD_TOKEN: Joi.string().required(),
}).unknown();
const { error, value: validatedConfig } = configSchema.validate(configuration);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// export
interface ENV {
  DISCORD_TOKEN: string;
}
export const config: ENV = validatedConfig as ENV;
