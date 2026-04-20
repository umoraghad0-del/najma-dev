import { getCourses, addCourse, deleteCourse, getBookings, getUsers } from "./api.js";

const bookingsContainer = document.querySelector("#adminBookings")
const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "admin") {
  alert("Du måste vara admin");
  window.location.href = "index.html";
};

const form = document.querySelector("#addCourseForm");
const coursesContainer = document.querySelector("#adminCourses");

async function loadCourses() {
  const courses = await getCourses();
  coursesContainer.innerHTML = "";

  courses.forEach(course => {
    coursesContainer.innerHTML += `
      <div class="courseCard">
        <h3>${course.title}</h3>
        <p>Kursnummer: ${course.courseNumber}</p>
        <p>Längd: ${course.days} dagar</p>
        <p>Pris: ${course.price} kr</p>

        <button data-id="${course.id}" class="deleteBtn">Ta bort</button>
      </div>
    `;
  });

  document.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      await deleteCourse(id);
      loadCourses();
    });

  });

};

async function loadBookings() {

  const bookings = await getBookings();
  const users = await getUsers();
  const courses = await getCourses();

  bookingsContainer.innerHTML = "<h3>Bokningar</h3>";

  if (bookings.length === 0) {
    bookingsContainer.innerHTML += "<p>Inga bokningar ännu</p>";
    return;
  };

  bookings.forEach(booking => {

    const user = users.find(u => u.id === booking.userId);
    const course = courses.find(c => c.id === booking.courseId);

    const div = document.createElement("div");

    div.classList.add("bookingCard");
    div.innerHTML = `
      <p><strong>${user?.name}</strong> bokade <strong>${course?.title}</strong></p>
    `;
    bookingsContainer.appendChild(div);
  });
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const course = {
    title: document.querySelector("#title").value,
    courseNumber: document.querySelector("#courseNumber").value,
    days: document.querySelector("#days").value,
    price: document.querySelector("#price").value
  };

  await addCourse(course);
  form.reset();
  loadCourses();

});

loadCourses();
loadBookings();