// Functions import
import { help } from "./functions/helpdisplay.js";

export class app {

    constructor() {
        this.argv = null;
    }

    async run(argv) {
        this.argv = argv;
        
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
