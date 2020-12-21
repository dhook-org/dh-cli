import Enquirer from "enquirer";
import kleur from "kleur";
import { cli } from "../../index.js";
import { getConfig, writeConfig } from "../utils/configs.js";

export async function unregister() {
    if (cli.argv.length < 2) return console.log(`${kleur.red("[ERROR]")} The unregister command should be specified with the name of the WebHook you wish to unregister`);
    let profile_config = await getConfig("hooks");
    if (!profile_config.hooks[cli.argv[1]]) return console.log(`${kleur.red("[ERROR]")} The "${cli.argv[1]}" WebHook is not registered.`)
    console.log(`${kleur.blue("Do you wish to unregister the " + cli.argv[1] + " WebHook ?")}\n${kleur.red("⚠ This cannot be undone.")}`);
    const confirm = new Enquirer();
    confirm.prompt({ type: "select", name: "confirm", message: "Confirm ?", choices: [ { name: "no", message: "No", value: true }, { name: "yes", message: "Yes", value: true } ] })
        .then(async result => {
            if (result.confirm == "no") return;
            profile_config.hooks[cli.argv[1]] = null;
            await writeConfig("hooks", profile_config);
            console.log(`${kleur.green("✔")} ${kleur.blue("WebHook profile " + cli.argv[1] + " successfully unregistered.")}`);
        });
}