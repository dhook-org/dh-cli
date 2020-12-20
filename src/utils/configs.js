import fs from "fs/promises";
import cli from "../../index.js";
import yaml from "yaml";

export async function get(file) {

    await fs.readFile(`${cli.config_path}\\${file}`, (err, data) => {
        if (err) throw err;
        return yaml.parse(data);
    });

}

export async function write(file, data) {

    await fs.writeFile(`${cli.config_path}\\${file}`, yaml.stringify(data), "utf-8", err => {
        if (err) throw err;
    });

}