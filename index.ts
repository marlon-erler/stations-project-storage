#! /usr/bin/env node

//IMPORTS
import Fs from "fs/promises";

//MAIN
let dir = "Storage";
let subcommand = process.argv[2];

//repair
if (subcommand == "init") {
	await Fs.mkdir(dir);
	process.exit(0);
}

//main
switch (subcommand) {
	default: {
		console.log("e3");
		process.exit();
	}
}
