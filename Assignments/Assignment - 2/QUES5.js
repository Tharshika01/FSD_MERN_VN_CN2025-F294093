let nums = [10, 25, 7, 40, 18];

let sum = 0;
for (let n of nums) sum += n;

let largest = Math.max(...nums);

console.log("Sum:", sum);
console.log("Largest:", largest);
