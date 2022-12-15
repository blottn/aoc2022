const fs = require("fs");
const encoding = "utf-8";

let input = fs.readFileSync(0, {encoding}).split('\n');
input.pop();
input.shift();

const logRet = (a) => {
  console.log(a);
  return a;
}

const root = {
  children: {},
  parent: null,
  size: 0,
};


const handleCmd = (state, line) => line === 'ls' ?
  handleLS(state) : handleCD(state, line.split(' ')[1]);

const handleLS = (node) => {
  node.size = 0;
  return node;
}

const handleCD = (node, directory) => {
  if (directory in node.children)
    return node.children[directory] // already seen
  let next = {
    children: {'..': node},
    size: 0,
  }
  node.children[directory] = next
  return next;
}
const handleFileInfo = (state, line) => {
  state.size += parseInt(line[0])
  return state;
}

input = input.filter(l => !(l.startsWith('dir')))
input.reduce((state, l) =>
             l.startsWith('$') ?
               handleCmd(state, l.substring(2))
                 :
                handleFileInfo(state, l.split(' ')),
             root);

const getRecSize = (node) => Object.keys(node.children)
  .filter(c => c !== '..')
  .map(c => getRecSize(node.children[c]))
  .reduce((a,b) => a + b, 0) + node.size;

const walk = (fn) => (node) => {
  return Object.keys(node.children)
  .filter(c => c !== '..')
  .map(c => [walk(fn), fn].map(f => f(node.children[c])))
}

const maxSize = 100000;
let p1 = 0;
walk((n) => p1 += (getRecSize(n) < maxSize ? getRecSize(n) : 0))(root);

const currentUnused = 70000000 - getRecSize(root);
const needFreed = 30000000 - currentUnused;
let p2 = getRecSize(root);
walk((n) => {
  let s = getRecSize(n);
  if (s > needFreed) {
    if (s < p2) {
      p2 = s;
    }
  }
})(root);
console.log(p2);
