import { jsonRequire } from "./jsonRequire.js";
import { cli } from "../../index.js";

export async function isCommand(command_name) {
    const commands_config = await jsonRequire(cli.current + "/src/configs/commands.json").catch(error => { throw error });
    const categories = commands_config.categories;

    for (let category in categories) {
        for (let command in categories[category].commands) {
            command = categories[category].commands[command];
            if (command.name == command_name) return command;
        }
    }
    return false;
}