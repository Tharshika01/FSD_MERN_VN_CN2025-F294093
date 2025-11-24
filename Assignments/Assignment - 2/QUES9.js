let p1 = 300;
let p2 = 500;

let result =
    p1 > p2
        ? `Person 1 earns more by ₹${p1 - p2}`
        : `Person 2 earns more by ₹${p2 - p1}`;

console.log(result);
