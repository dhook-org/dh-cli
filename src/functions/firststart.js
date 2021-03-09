// Modules imports
import figlet from "figlet";
import kleur from "kleur";
import ora from "ora";
import fs from "fs/promises";
import yaml from "yaml";

// Internal imports
import { cli } from "../../index.js";
import { sleep } from "../utils/sleep.js";
import { jsonRequire } from "../utils/jsonRequire.js";

export async function firstStart() {

    const spinner = ora({ text: "Loading config files..." }).start();
    await setupConfig();
    spinner.stop();
    display();

}

const setupConfig = async () => {

    await fs.appendFile(cli.config_path + "\\hooks", yaml.stringify({ hooks: { default: null } }), error => { throw error; });

}

const display = async () => {

    let text = kleur.green("\n-------------------------------------\n");
    figlet("DH-CLI", (error, data) => {
        if (error) throw error;
        text += kleur.blue(data);
    });
    await sleep(1000);
    text += kleur.green("\n-------------------------------------\n");
    const package_data = await jsonRequire(cli.current + "\\package.json");
    text += `\n${kleur.blue().bold("Name: ") + package_data.name}\n${kleur.blue().bold("Version: ") + package_data.version}\n${kleur.blue().bold("Author: ") + "dhook-org"}`;
    console.log(text);

}
