const fs = require("fs");
const encoding = "utf-8";

let input = fs.readFileSync("./input", {encoding}).split('\n');
input.pop();

let outcomes = {
  'A': {
    'X': 3,
    'Y': 4,
    'Z': 8,
  },
  'B': {
    'X': 1,
    'Y': 5,
    'Z': 9,
  },
  'C': {
    'X': 2,
    'Y': 6,
    'Z': 7,
  }
};

let scores = {
  'X': 1,
  'Y': 2,
  'Z': 3,
}
let out = input.map(game => {
  let [theres, yours] = game.split(' ');
  return outcomes[theres][yours];
}).reduce((acc, x) => x + acc);
console.log(out);
