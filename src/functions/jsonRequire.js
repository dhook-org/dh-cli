import fs from "fs";

export async function jsonRequire(path) {
    return new Promise((resolve, reject) => {
        fs.readFileSync("./src/" + path, "utf-8", (err, data) => {
            if (err) reject(err);
            resolve(JSON.parse(data));
        })
    });
}
