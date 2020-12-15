// Functions import
import { help } from "./functions/helpdisplay.js";
import { getInstalledPath } from "get-installed-path";

export class app {

    constructor(argv) {
        this.argv = argv;
        this.run();
    }

    async run() {
        this.current = await getInstalledPath("dh-cli").catch(err => {
            throw "Can't find dh-cli path. Is it installed globally ?";
        });

        switch (this.argv[0]) {
            // Help command, will display every single commands of dh-cli.
            case "help":
                await help(false); 
                break;

            // default command response, will show commands list if no args are passed or unknown command is called.
            default:
                await help(true);
        }
    }

}
