const mongoose = require("mongoose");

mongoose.connect("mongodb://tserentemuulen2000_db_user:M3kF3LpDwntoNNXH@ac-edqolwq-shard-00-00.nb6olmv.mongodb.net:27017,ac-edqolwq-shard-00-01.nb6olmv.mongodb.net:27017,ac-edqolwq-shard-00-02.nb6olmv.mongodb.net:27017/?ssl=true&replicaSet=atlas-hq8z70-shard-0&authSource=admin&appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("ERROR:", err));

const Seat = mongoose.model("Seat", {
  seatId: String,
  status: String,
  bookingId: String
});

async function createSeats() {

  let seats = [];

  // LEFT SIDE
  for (let i = 1; i <= 36; i++) {
    seats.push({ seatId: "L" + i, status: "available" });
  }

  // RIGHT SIDE
  for (let i = 1; i <= 36; i++) {
    seats.push({ seatId: "R" + i, status: "available" });
  }

  await Seat.insertMany(seats);

  console.log("Seats created!");
}

createSeats();