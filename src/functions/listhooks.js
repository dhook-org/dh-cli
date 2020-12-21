import kleur from "kleur";
import { getConfig } from "../utils/configs.js";

export async function listHooks() {
    const profile_config = await getConfig("hooks");
    console.log(kleur.blue("Hooks list:"));
    let list = "";
    for (let hook in profile_config.hooks) {
        if (profile_config.hooks[hook] == null) continue;
        list += "- " + hook + "\n";
    }
    if (list === "") list = kleur.red("There are no webhooks yet :'(");
    console.log(list);
}