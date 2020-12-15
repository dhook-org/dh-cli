// Functions import
import { help } from "./functions/helpdisplay.js";
import { getInstalledPath } from "get-installed-path";
import fs from "fs";

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
                // Help command, will display every single commands of dh-cli.
                case "help":
                    await help(false); 
                    break;
    
                // default command response, will show commands list if no args are passed or unknown command is called.
                default:
                    await help(true);
            }
        } else {
            console.log(false)
        }

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
