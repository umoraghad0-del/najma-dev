import { getCourseById } from "./api.js";

const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");
const container = document.querySelector("#courseDetail");

const loadCourse = async () => {
  try {
    const course = await getCourseById(courseId);

    container.innerHTML = `
      <img src="${course.image}" alt="${course.title}">
      <h2>${course.title}</h2>
      <p>Kursnummer: ${course.courseNumber}</p>
      <p>Längd: ${course.days} dagar</p>
      <p>Startdatum: ${course.startDate}</p>
      <p>Typ: ${course.type}</p>

      <a href="booking.html?courseId=${course.id}">
        <button>Boka kurs</button>
      </a>
    `;

  } catch (error) {
    container.innerHTML = `<p style="color:red;">Kunde inte ladda kursen.</p>`;
    console.error(error);
  }
};

loadCourse();