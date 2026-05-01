const defaultRides = [
  { id: "001", fare: 220 },
  { id: "002", fare: 180 },
  { id: "003", fare: 310 }
];

const savedRides = localStorage.getItem("farasRides");

let rides = savedRides ? JSON.parse(savedRides) : [];
const farasFee = 0.05;
const traditionalFee = 0.25;

const ridesList = document.querySelector("#rides-list");
const totalRidesElement = document.querySelector("#total-rides");
const driverEarningsElement = document.querySelector("#driver-earnings");
const farasFeeElement = document.querySelector("#faras-fee");
const traditionalFeeElement = document.querySelector("#traditional-fee");
const averageFareElement = document.querySelector("#average-fare");
const driverLossElement = document.querySelector("#driver-loss");
const resetButton = document.querySelector("#reset-btn");
const driverSavingsElement = document.querySelector("#driver-savings");
const loadButton = document.querySelector("#load-btn");

const rideForm = document.querySelector("#ride-form");
const rideFareInput = document.querySelector("#ride-fare");

function calculateDriverEarnings(fare, fee) {
  return fare - fare * fee;
}

function renderRides() {
  ridesList.innerHTML = "";

  if (rides.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.textContent = "No rides yet. Add your first ride.";
    ridesList.appendChild(emptyMessage);
    return;
  }

  rides.forEach((ride) => {
    const driverEarnings = calculateDriverEarnings(ride.fare, farasFee);

    const listItem = document.createElement("li");
    listItem.textContent = `Ride #${ride.id} — ${ride.fare} SEK — Driver received ${driverEarnings.toFixed(2)} SEK`;

    ridesList.appendChild(listItem);
  });
}

function updateOverview() {
  const totalRides = rides.length;

  const totalDriverEarnings = rides.reduce((sum, ride) => {
    return sum + calculateDriverEarnings(ride.fare, farasFee);
  }, 0);

  const totalTraditionalEarnings = rides.reduce((sum, ride) => {
    return sum + calculateDriverEarnings(ride.fare, traditionalFee);
  }, 0);

  const driverLoss = totalDriverEarnings - totalTraditionalEarnings;
  const savingsPercent = traditionalFee - farasFee;

  const totalFare = rides.reduce((sum, ride) => {
  return sum + ride.fare;
}, 0);

const averageFare = rides.length > 0 ? totalFare / rides.length : 0;

  totalRidesElement.textContent = totalRides;
  driverEarningsElement.textContent = `${totalDriverEarnings.toFixed(2)} SEK`;
  farasFeeElement.textContent = "5%";
  traditionalFeeElement.textContent = "25%";
  driverLossElement.textContent = `${driverLoss.toFixed(2)} SEK`;
  driverSavingsElement.textContent = `${(savingsPercent * 100).toFixed(0)}%`;
  averageFareElement.textContent = `${averageFare.toFixed(2)} SEK`;
};

function addRide(fare) {
  const newRide = {
    id: String(rides.length + 1).padStart(3, "0"),
    fare: fare
  };

  rides.push(newRide);
  localStorage.setItem("farasRides", JSON.stringify(rides));
  renderRides();
  updateOverview();
}

rideForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newFare = Number(rideFareInput.value);

  if (newFare <= 0) {
    return;
  }

  addRide(newFare);
  rideFareInput.value = "";
});

resetButton.addEventListener("click", () => {
  rides = [];
  localStorage.removeItem("farasRides");

  renderRides();
  updateOverview();
});
loadButton.addEventListener("click", () => {
  rides = [...defaultRides];
  rides = [
    { id: "001", fare: 220 },
    { id: "002", fare: 180 },
    { id: "003", fare: 310 }
  ];

  localStorage.setItem("farasRides", JSON.stringify(rides));

  renderRides();
  updateOverview();
});

renderRides();
updateOverview();