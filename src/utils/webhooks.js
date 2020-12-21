import fetch from "node-fetch";

export function getWebHook(webhook_link) {
    return new Promise((resolve, reject) => {

        fetch(webhook_link, { method: "GET" })
            .then(response => response.json())
            .then(json => {
                if (json.message) reject(json);
                resolve(json);
            }).catch(error => {
                reject(error);
            });

    });

}