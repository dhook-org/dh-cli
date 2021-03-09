import kleur from "kleur";
import { jsonRequire } from "../utils/jsonRequire.js";
import { isCommand } from "../utils/isCommand.js";
import { cli } from "../../index.js";

export async function help(isDefault = false) {
    const commands_config = await jsonRequire(cli.current + "/src/configs/commands.json").catch(error => { throw error });
    const categories = commands_config.categories;

    let commands = "";
    for (let category in categories) {
        commands += "\n\t" + categories[category].name + ":\n";
        for (let command in categories[category].commands) {
            command = categories[category].commands[command];
            commands += "\t- " + command.name + ((command.name.length < 6) ? "\t" : "") + "\t| " + command.description + "\n";
        }
    }

    console.log(((isDefault == true) ? `${kleur.red("[ERROR]")} please specify an argument.\n` : "") + `${commands}\nFor more precise help, type "dh help [command]"`);
}

export async function commandHelp(command_name) {
    let command = await isCommand(command_name);
    if (command !== false) {
        let text = `    Command help:\n\t${kleur.blue().bold("Name: ") + command.name}\n\t${kleur.blue().bold("Description: ") + command.description}\n\t${kleur.blue().bold("Use: ") + command.use}`;
        console.log(text);
    } else {
        console.log(`${kleur.red("[ERROR]")} Unknown command "${command_name}"`);
        help();
    }
}