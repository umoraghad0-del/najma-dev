import { createBooking } from "./api.js";

const params = new URLSearchParams(window.location.search);
const courseId = params.get("courseId");

const form = document.querySelector("#bookingForm");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const user = JSON.parse(localStorage.getItem("loggedInUser"));

const booking = {

courseId: Number(courseId),
userId: user.id,

name: document.querySelector("#name").value,
address: document.querySelector("#address").value,
email: document.querySelector("#email").value,
phone: document.querySelector("#phone").value,

date: new Date().toISOString()

};

await createBooking(booking);

alert("Bokning genomförd!");

window.location.href = "index.html";

});