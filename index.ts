#! /usr/bin/env node

/* TODO
- absolute paths
*/

//IMPORTS
import Fs from "fs/promises";
import Path from "path";

//MAIN
let dir = "Storage";
let user_number = process.argv[2];
let subcommand = process.argv[3];
let user_dir = Path.join(process.cwd(), dir, `a${user_number}`);
let path_1 = process.argv[4] ?? ".";
let path_2 = process.argv[5] ?? ".";

//safety
if (subcommand == "init") {
	await Fs.mkdir(dir);
	process.exit(0);
}
//make sure number is defined
if (user_number == null) {
	console.log("e-invalid-number");
	process.exit();
}
//create user directory if necessary
try {
	await Fs.mkdir(user_dir);
} catch {
} finally {
	process.chdir(user_dir);
}

//main]
switch (subcommand) {
	//read
	case "ls": {
		try {
			let items = await Fs.readdir(path_1);
			items.map(async item => [ item, (await Fs.stat(Path.join(path_1, item))).isDirectory() == true ? "dir" : "file" ]);
			let response = JSON.stringify(items, null, 4);
			console.log(response);
			process.exit(0);
		} catch {
			console.log("e2");
			process.exit();
		}
	}

	case "whereis": {
		console.log(Path.join(process.cwd(), path_1));
		process.exit(0);
	}

	default: {
		console.log("e3");
		process.exit();
	}
}
