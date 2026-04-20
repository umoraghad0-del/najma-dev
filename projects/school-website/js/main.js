import { getCourses } from "./api.js";
import { logout } from "./auth.js"
const user = JSON.parse(localStorage.getItem("user"))

const userInfo = document.querySelector("#userInfo")

if(user && userInfo){

userInfo.textContent = `Inloggad: ${user.name}`

} else if(userInfo){

userInfo.textContent = "Ej inloggad"

}
const logoutBtn = document.querySelector("#logoutBtn")

if(logoutBtn){
logoutBtn.addEventListener("click", logout)
}
document.addEventListener("DOMContentLoaded", () => {

const coursesContainer = document.querySelector("#coursesList");

const loadCourses = async () => {

try{

const courses = await getCourses();

coursesContainer.innerHTML = "";

courses.forEach(course => {

const card = document.createElement("div");

card.classList.add("courseCard");

card.innerHTML = `

<img src="img/${course.image}" alt="${course.title}">
<h3>${course.title}</h3>

<p>${course.days} dagar | ${course.type}</p>

<a href="courseDetails.html?id=${course.id}">
<button>Se kurs</button>
</a>

`;

coursesContainer.appendChild(card);

});

}catch(error){

console.error(error);

coursesContainer.innerHTML =
"<p style='color:red'>Kunde inte ladda kurser</p>";

}

};

loadCourses();

});