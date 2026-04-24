const rides = [
  { id: "001", fare: 220 },
  { id: "002", fare: 180 },
  { id: "003", fare: 310 }
];

const farasFee = 0.05;
const ridesList = document.querySelector("#rides-list");

rides.forEach((ride) => {
  const driverEarnings = ride.fare - ride.fare * farasFee;

  const listItem = document.createElement("li");
  listItem.textContent = `Ride #${ride.id} — ${ride.fare} SEK — Driver received ${driverEarnings} SEK`;

  ridesList.appendChild(listItem);
});

const totalRidesElement = document.querySelector("#total-rides");
const driverEarningsElement = document.querySelector("#driver-earnings");
const farasFeeElement = document.querySelector("#faras-fee");
const traditionalFeeElement = document.querySelector("#traditional-fee");

const totalRides = rides.length;
const totalDriverEarnings = rides.reduce((sum, ride) => {
  return sum + (ride.fare - ride.fare * farasFee);
}, 0);

totalRidesElement.textContent = totalRides;
driverEarningsElement.textContent = `${totalDriverEarnings} SEK`;
farasFeeElement.textContent = "5%";
traditionalFeeElement.textContent = "25%";