const fs = require("fs");
const encoding = "utf-8";

let input = fs.readFileSync(0, {encoding}).split('\n');
input.pop();

let scores = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const score = (l) => {
  return scores.split('').indexOf(l) + 1;
}

const sum = (acc, next) => acc + next;

let cmps = input.map(bag => [
  bag.split('').slice(0,bag.length / 2),
  bag.split('').slice(bag.length / 2)
])

let inBoth = cmps.map(([l, r]) => {
  return l.filter(itm => r.includes(itm)).pop();
});

let prios = inBoth.map(score);

console.log(prios.reduce(sum));

input = input.map(l => l.split(''));
let bs = input.filter((_, i) => i % 3 == 0)
  .map((e1, i) => e1.filter(
    x => input[i*3+1].includes(x) && input[i*3+2].includes(x)
  ).pop())
  .map(score)
  .reduce(sum);

console.log(bs);
