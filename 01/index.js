const fs = require("fs");
const encoding = "utf-8";

let input = fs.readFileSync("./input", {encoding}).split('\n');
input.pop();

let elves = [0];

input.map(line => parseInt(line))
  .map(cal => {
    if (isNaN(cal)) {
      return elves.push(0);
    }
    elves[elves.length - 1] += cal;
  });

let maxdex = 0;

elves.sort();
console.log(elves[elves.length -1] + elves[elves.length -2] + elves[elves.length -3]);
