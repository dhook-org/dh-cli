import kleur from "kleur";
import { jsonRequire } from "../utils/jsonRequire.js";

export async function help(isDefault = false) {
    const commands_config = await jsonRequire("configs/commands.json");
    const categories = commands_config.categories;

    let commands = "";
    for (let category in categories) {
        commands += "\n\t" + categories[category].name + ":\n";
        for (let command in categories[category].commands) {
            command = categories[category].commands[command];
            commands += "\t- " + command.name + ((command.name.length < 6) ? "\t" : "") + "\t| " + command.description + "\n";
        }
    }

    console.log(((isDefault == true) ? `${kleur.red("[ERROR]")} please specify an argument.\n` : "") + `${commands}`);
}