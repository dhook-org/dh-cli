import kleur from "kleur";

export const constants = {
    questions: [
        {
            type: "input",
            name: "hook_id",
            message: kleur.green().bold("Identifier:")
        }, 
        {
            type: "input",
            name: "hook_link",
            message: kleur.green().bold("Link:")
        }
    ]
}