import kleur from "kleur";
import { jsonRequire } from "./functions/jsonRequire.js";
import fs from "fs";

export class app {

    constructor() {
        this.argv = null;
    }

    async run(argv) {
        this.argv = argv;
        
        if (argv[0] == null) {
            const commands_config = await jsonRequire("configs/commands.json");
            const categories = commands_config.categories;

            let commands = "";
            for (let category in categories) {
                commands += "\t" + categories[category].name + ":\n";
                for (let command in categories[category].commands) {
                    command = categories[category].commands[command];
                    commands += "\t- " + command.name + "\t| " + command.description;
                }
            }

            console.log(`${kleur.red("[ERROR]")} please specify an argument.\n\n${commands}`);
        }
    }

}
