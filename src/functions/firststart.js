// Modules imports
import figlet from "figlet";
import kleur from "kleur";
import ora from "ora";
import fs from "fs/promises";
import yaml from "yaml";

// Internal imports
import { cli } from "../../index.js";
import { sleep } from "../utils/sleep.js";

export async function firstStart() {

    const spinner = ora({ text: "Loading config files..." }).start();
    await setupConfig();
    spinner.stop();
    display();

}

async function setupConfig() {

    await fs.appendFile(cli.config_path + "\\hooks", yaml.stringify({ hooks: [] }), error => { throw error; });

}

async function display() {

    let text = kleur.green("-------------------------------------\n");
    figlet("DH-CLI", (error, data) => {
        if (error) throw error;
        text += kleur.blue(data);
    });
    await sleep(1000);
    text += kleur.green("\n-------------------------------------");
    console.log(text)

}
