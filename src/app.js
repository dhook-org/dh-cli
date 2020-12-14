import kleur from "kleur";
import { jsonRequire } from "./utils/jsonRequire.js";

export class app {

    constructor() {
        this.argv = null;
    }

    async run(argv) {
        this.argv = argv;
        
        // default command response, will show commands list if no args are passed.
        if (argv[0] == null) {
            const commands_config = await jsonRequire("configs/commands.json");
            const categories = commands_config.categories;

            let commands = "";
            for (let category in categories) {
                commands += "\n\t" + categories[category].name + ":\n";
                for (let command in categories[category].commands) {
                    command = categories[category].commands[command];
                    commands += "\t- " + command.name + ((command.name.length < 6) ? "\t": "") + "\t| " + command.description + "\n";
                }
            }

            console.log(`${kleur.red("[ERROR]")} please specify an argument.\n${commands}`);
        }
    }

}
