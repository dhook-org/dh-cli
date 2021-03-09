import fs from "fs";

export async function jsonRequire(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf-8", (err, data) => {
            if (err) return reject(err);
            resolve(JSON.parse(data));
        })
    });
}
