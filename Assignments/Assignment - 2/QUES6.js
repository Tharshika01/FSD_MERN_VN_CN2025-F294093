let totalSeats = 120;
let bookedSeats = 78;

let available = totalSeats - bookedSeats;
console.log("Available Seats:", available);

let status =
    available < 20
        ? "Almost Full"
        : available <= 60
        ? "Moderate Availability"
        : "Plenty of Seats Available";

console.log("Status:", status);
