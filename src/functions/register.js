import { cli } from "../../index.js";
import { constants } from "../utils/constants.js";
import { getConfig, writeConfig } from "../utils/configs.js";
import { getWebHook } from "../utils/webhooks.js";

import kleur from "kleur";
import Enquirer from "enquirer";

export async function register() {

    if (cli.argv.length > 1) {
        await native();
    } else {
        await interactive();
    }

}

const interactive = async () => {
    console.log(kleur.blue("Starting an interactive webhook registeration:"));

    const form = new Enquirer();

    form.prompt(constants.questions).then(async result => {
        let profile_config = await getConfig("hooks");
        if (result.hook_id.length < 1) return console.log(`${kleur.red("[ERROR]")} The WebHook ID must be composed of at least one character`);
        else if (profile_config.hooks[result.hook_id] && profile_config.hooks[result.hook_id] != null) return console.log(`${kleur.red("[ERROR]")} This profile is already registered you should use "gh edit instead"`);
        else if (!result.hook_link.match(/((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]`#|]+)/g)) return console.log(`${kleur.red("[ERROR]")} The WebHook link must be a valid URI value`);
        getWebHook(result.hook_link).then(async hook => {
            profile_config.hooks[result.hook_id] = result.hook_link;
            await writeConfig("hooks", profile_config);
            console.log(`${kleur.green("✔")} ${kleur.blue("WebHook profile " + result.hook_id + " successfully registered.")}`);
        }).catch(error => {
            console.log(`${kleur.red("[ERROR]")} The WebHook link must be a valid Discord WebHook URI`);
        });
    });
    
}

const native = async () => {

}