// Functions import
import { help, commandHelp } from "./functions/helpdisplay.js";
import { firstStart } from "./functions/firststart.js";
import { register } from "./functions/register.js";
import { unregister } from "./functions/unregister.js";

// Modules imports
import { getInstalledPath } from "get-installed-path";
import fs from "fs";
import { listHooks } from "./functions/listhooks.js";
import { send } from "./functions/webhookpost.js";

export class app {

    constructor(argv) {
        this.argv = argv;
        this.config_path = null;
        this.run();
    }

    async run() {
        this.current = await getInstalledPath("dh-cli").catch(err => {
            throw "Can't find dh-cli path. Is it installed globally ?";
        });
        
        if (await this.getConfigPath() !== false) {
            this.config_path = await this.getConfigPath();
            switch (this.argv[0]) {
                case "send":
                    await send()    
                    break;
                    
                case "list":
                    await listHooks();
                    break;

                case "unregister":
                    await unregister();
                    break;

                case "register":
                    await register();
                    break;

                // Help command, will display every single commands of dh-cli.
                case "help":
                    if (this.argv[1] == undefined) await help(false);
                    else await commandHelp(this.argv[1]); 
                    break;
    
                // default command response, will show commands list if no args are passed or unknown command is called.
                default:
                    await help(true);
            }
        } else { this.config_path = process.env.HOMEDRIVE + process.env.HOMEPATH + "\\.dh"; firstStart(); }

    }

    async getConfigPath() {
        let homepath;
        if (process.env.OS.includes("Windows")) homepath = process.env.HOMEDRIVE + process.env.HOMEPATH;
        else homepath = process.env.HOMEPATH;
        
        if (fs.existsSync(homepath + "\\.dh")) return homepath + "\\.dh";
        else {

            fs.mkdir(homepath + "\\.dh", (err) => {
                if (err) throw err;
            });
            
            return false;

        } 

    }

}
