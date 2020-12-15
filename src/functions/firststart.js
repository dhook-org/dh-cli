// Modules imports
import figlet from "figlet";
import kleur from "kleur";
import ora from "ora";

// Internal imports
import { cli } from "../../index.js";

export async function firstStart() {

    const spinner = ora({ text: "Loading config files..." }).start();
    await setupConfig();
    spinner.stop();

}

async function setupConfig() {
    


}

function display() {



}
