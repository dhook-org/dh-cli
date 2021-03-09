import kleur from "kleur";
import { cli } from "../../index.js";
import { getConfig } from "../utils/configs.js";
import fetch from "node-fetch";
import { jsonRequire } from "../utils/jsonRequire.js";

export async function send() {
    if (cli.argv.length < 2) return console.log(`${kleur.red("[ERROR]")} The send command should be used with the name of a registered hook on your user profile.`);
    const profile_config = await getConfig("hooks");
    if (!profile_config.hooks[cli.argv[1]] && profile_config.hooks[cli.argv[1]] == null) return console.log(`${kleur.red("[ERROR]")} The provided hook is not registered on your user profile.`);
    if (cli.argv.length < 4) return console.log(`${kleur.red("[ERROR]")} Missing command arguments.`);
    if (cli.argv.indexOf("-m") > -1) {
        let message_index = cli.argv.indexOf("-m") + 1;
        const data = {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ content: cli.argv[message_index] })
        }
        console.log(await fetch(profile_config.hooks[cli.argv[1]], data));
        console.log(`${kleur.green("✔")} ${kleur.blue("Your message was successfully sent.")}`);
    }
    else if (cli.argv.indexOf("-f")) {
        let file_index = cli.argv.indexOf("-f") + 1;
        jsonRequire("./" + cli.argv[file_index])
            .then(json => {
                const data = {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(json)
                }
                fetch(profile_config.hooks[cli.argv[1]], data)
                    .then(response => {
                        if (response.status == 400) return console.log(`${kleur.red("[ERROR]")} There was an error in your JSON code, please verify it before sending.`);
                        console.log(`${kleur.green("✔")} ${kleur.blue("Your message was successfully sent.")}`);
                    });
            })
            .catch(() => console.log(`${kleur.red("[ERROR]")} This file does not exists.`));
    } 
    else console.log(`${kleur.red("[ERROR]")} No executable argument.`);
}