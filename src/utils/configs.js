import fsp from "fs/promises";
import fs from "fs";
import { cli } from "../../index.js";
import yaml from "yaml";
import { resolve } from "path";
import { rejects } from "assert";

export async function getConfig(file) {
    return new Promise((resolve, rejects) => {
        fs.readFile(`${cli.config_path}\\${file}`, "utf8", (err, data) => {
            if (err) throw err;
            resolve(yaml.parse(data));
        });
    });

}

export async function writeConfig(file, data) {

    await fsp.writeFile(`${cli.config_path}\\${file}`, yaml.stringify(data), "utf-8", err => {
        if (err) throw err;
    });

}