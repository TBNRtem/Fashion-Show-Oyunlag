const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://tserentemuulen2000_db_user:M3kF3LpDwntoNNXH@ac-edqolwq-shard-00-00.nb6olmv.mongodb.net:27017,ac-edqolwq-shard-00-01.nb6olmv.mongodb.net:27017,ac-edqolwq-shard-00-02.nb6olmv.mongodb.net:27017/?ssl=true&replicaSet=atlas-hq8z70-shard-0&authSource=admin&appName=Cluster0");

// 🪑 SEAT MODEL
const Seat = mongoose.model("Seat", {
  seatId: String,
  status: String,
  bookingId: String
});


// 🟢 GET ALL SEATS
app.get("/seats", async (req, res) => {
  const seats = await Seat.find();
  res.json(seats);
});


// 🟡 RESERVE SEATS
app.post("/reserve", async (req, res) => {
  const { seats, bookingId } = req.body;

  for (let seat of seats) {
    await Seat.updateOne(
      { seatId: seat },
      { status: "reserved", bookingId }
    );
  }

  res.json({ success: true });
});


// 🔴 CONFIRM PAYMENT (ADMIN)
app.post("/confirm", async (req, res) => {
  const { bookingId } = req.body;

  await Seat.updateMany(
    { bookingId },
    { status: "paid" }
  );

  res.json({ success: true });
});


// 🚀 START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});