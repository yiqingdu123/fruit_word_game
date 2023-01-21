let fs = require("fs");

const masterWordList = fs.readFileSync("WordList.txt").toString().split("\n");
