let input = process.argv.slice(2);
let fs = require("fs");
let path = require("path");
let {tree} = require("./commands/tree");
let {organize} = require("./commands/organize");
let {help} = require("./commands/help");

let command = input[0];
let dirPath = input[1];

let types = {
  media: ["mp4", "mkv"],
  archives: ["zip", "rar"],
  documents: ["css", "js", "txt", "html"],
  app: ["exe"],
};
switch (command) {
  case "tree":
    tree(dirPath);
    break;
  case "organize":
    organize(dirPath);
    break;
  case "help":
    help();
    break;
  default:
    console.log("please 🙏🏻 provide valid input");
}

