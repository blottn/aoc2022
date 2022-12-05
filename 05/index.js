const fs = require("fs");
const encoding = "utf-8";

let [stacks, insts] = fs.readFileSync(0, {encoding}).split('\n\n');
stacks = stacks.split('\n');

insts = insts.split('\n')
insts.pop();

let itms = stacks.map(row => row.split('').filter((_, i) => i % 4 == 1));
itms.pop();
stacks = itms[0].map((_, i) => itms.map(r => r[i]).reverse().filter(x => x !== ' '));
stacks.unshift([]);
insts = insts.map(inst => inst.split(' '))
  .map(([_, amt, __, from, ___, to]) => [parseInt(amt), parseInt(from), parseInt(to)])
  .map(([amt, from, to]) => stacks[to].push(...stacks[from].splice(stacks[from].length - amt, amt)))

console.log(stacks.map(s => s.pop()).join(''))
