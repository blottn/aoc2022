const fs = require("fs");
const encoding = "utf-8";

let input = fs.readFileSync(0, {encoding}).split('\n');
input.pop();
input = input.map(l => l.split(',').map(el => el.split('-').map(d => parseInt(d))));

let out = input.map(([[l1,h1],[l2, h2]]) => (l2 >= l1 && h2 <= h1) || (l1 >= l2 && h1 <= h2))
  .map(b => b & 1)
  .reduce((a, n) => a + n);

console.log(out);
let out2 = input.map(([[l1,h1],[l2, h2]]) => (l2 >= l1 && l2 <= h1) ||
                     (h2 >= l1 && h2 <= h1) ||
                     (l1 >= l2 && h1 <= h2))
  .map(b => b & 1)
  .reduce((a,n) => a + n);
console.log(out2);
