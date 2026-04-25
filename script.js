const API = "http://localhost:5000";

let selected = [];

// 12 columns, 3 seats each
const cols = 12;
const rows = 3;

async function loadSeats() {
  const res = await fetch(API + "/seats");
  const seats = await res.json();

  const left = document.getElementById("left");
  const right = document.getElementById("right");

  left.innerHTML = "";
  right.innerHTML = "";

  let index = 0;

  // LEFT SIDE (vertical columns)
  for (let c = 0; c < cols; c++) {

    const col = document.createElement("div");
    col.className = "col";

    for (let r = 0; r < rows; r++) {
      const seat = seats[index++];
      col.appendChild(createSeat(seat));
    }

    left.appendChild(col);
  }

  // RIGHT SIDE (vertical columns)
  for (let c = 0; c < cols; c++) {

    const col = document.createElement("div");
    col.className = "col";

    for (let r = 0; r < rows; r++) {
      const seat = seats[index++];
      col.appendChild(createSeat(seat));
    }

    right.appendChild(col);
  }
}

// CREATE SEAT
function createSeat(seat) {
  const el = document.createElement("div");
  el.className = "seat";
  el.innerText = seat.seatId;

  if (seat.status === "paid") el.style.background = "red";
  if (seat.status === "reserved") el.style.background = "orange";

  el.onclick = () => {
    if (seat.status !== "available") return;

    if (selected.includes(seat.seatId)) {
      selected = selected.filter(s => s !== seat.seatId);
      el.classList.remove("selected");
    } else {
      selected.push(seat.seatId);
      el.classList.add("selected");
    }

    updateUI();
  };

  return el;
}

function updateUI() {
  document.getElementById("selected").innerText =
    selected.length ? selected.join(", ") : "None";

  document.getElementById("total").innerText =
    selected.length * 50000;
}

async function reserve() {
  const bookingId = Date.now().toString();

  await fetch(API + "/reserve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      seats: selected,
      bookingId
    })
  });

  alert("Reserved! Booking ID: " + bookingId);

  selected = [];
  loadSeats();
}

loadSeats();