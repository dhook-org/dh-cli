import kleur from "kleur";
import { jsonRequire } from "./functions/jsonRequire.js";

export class app {

    constructor() {
        this.argv = null;
    }

    run(argv) {
        this.argv = argv;
        
        if (argv[0] == null) {
            const commands_config = jsonRequire("configs/commands.json");
            const commands_list = commands_config.commands;
            const commands_categories = commands_config.categories;

            let commands = "";
            for (category in commands_categories) {
                commands += "/t" + category + ":"
            }

            console.log(`${kleur.red("[ERROR]")} please specify an argument.\n\n${commands}`);
        }
    }

}
