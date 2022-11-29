#! /usr/bin/env node

//IMPORTS
import Fs from "fs/promises";
import Path from "path";

//MAIN
let dir = "Storage";
let user_number = process.argv[2];
let subcommand = process.argv[3];
let user_dir = Path.join(process.cwd(), dir, `a${user_number}`);
let path = process.argv[4] ?? ".";
let arg_2 = process.argv[5] ?? ".";

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
	case "fin": {
		try {
			let content = await Fs.readFile(path, { encoding: "utf8" });
			console.log(content);
			process.exit(0);
		} catch {
			console.log("e2");
			process.exit();
		}
	}
	case "ls": {
		try {
			let items = await Fs.readdir(path) as any[];
			let i = 0;
			while (i < items.length) {
				let is_dir = (await Fs.stat(Path.join(path, items[i]))).isDirectory();
				let type = is_dir ? "dir" : "file";

				items[i] = [ type, items[i] ];
				i++;
			}
			let response = JSON.stringify(items, null, 4);
			console.log(response);
			process.exit(0);
		} catch {
			console.log("e2");
			process.exit();
		}
	}
	case "whereis": {
		console.log(Path.join(process.cwd(), path));
		process.exit(0);
	}

		//write
	case "cp": {
		try {
			await Fs.copyFile(path, arg_2);
			console.log("to '%s'", arg_2);
			process.exit(0);
		} catch {
			console.log("e2");
			process.exit();
		}
	}
	case "fout": {
		try {
			await Fs.writeFile(path, arg_2);
			console.log(path);
			process.exit(0);
		} catch {
			console.log("e2");
			process.exit();
		}
	}
	case "mkdir": {
		try {
			await Fs.mkdir(path, { recursive: true });
			console.log(path);
			process.exit(0);
		} catch {
			console.log("e2");
			process.exit();
		}
	}
	case "rm": {
		try {
			await Fs.rm(path, { recursive: true });
			console.log(path);
			process.exit(0);
		} catch {
			console.log("e2");
			process.exit();
		}
	}

	default: {
		console.log("e3");
		process.exit();
	}
}
