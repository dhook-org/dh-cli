#!/usr/bin/env node

const argv = process.argv;
argv.splice(0, 2);

import { app } from "./src/app.js";
// Require the main CLI App (This file is just the command execution file)

let cli = new app().run(argv);

export { cli };