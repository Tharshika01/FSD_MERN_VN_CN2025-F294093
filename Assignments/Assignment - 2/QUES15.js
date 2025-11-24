let expenses = [2000, 1500, 3500, 4000];

function totalSpent(arr) {
    let sum = 0;
    for (let x of arr) sum += x;
    console.log("Total Spent:", sum);
}

totalSpent(expenses);
