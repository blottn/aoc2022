const fs = require("fs");
const encoding = "utf-8";

let input = fs.readFileSync(0, {encoding}).split('');
input.pop();

const lastX = (from, x) => [...new Array(x).keys()]
    .reduce((acc, n) => ({[input[from - n]]: true, ...acc}), {}) 


const last4 = (from) => lastX(from, 4);
const last14 = (from) => last14(from, 14);

let solve = (len) => input.map((_, i) => i > len - 2 ? i : false)
    .filter(b => b)
    .map(i => [Object.keys(lastX(i, len)).length == len, i + 1])
    .reduce(([yes, where], [yesNext, whereNext]) => yesNext && !yes ? [yesNext, whereNext] : [yes, where]);



console.log(solve(4));
console.log(solve(14));
