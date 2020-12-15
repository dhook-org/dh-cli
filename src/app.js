// Functions import
import { help } from "./functions/helpdisplay.js";
import { getInstalledPath } from "get-installed-path";

export class app {

    constructor() {
        this.argv = null;
        this.current = null;
    }

    async run(argv) {
        this.argv = argv;
        this.current = await getInstalledPath("dh-cli").catch(err => {
            throw "Can't find dh-cli path. Is it installed globally ?";
        });

        switch (argv[0]) {
            // Help command, will display every single commands of dh-cli.
            case "help":
                help(false); 
                break;

            // default command response, will show commands list if no args are passed or unknown command is called.
            default:
                help(true);
        }
    }

}
