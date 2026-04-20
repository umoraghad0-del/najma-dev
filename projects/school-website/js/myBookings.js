import { getBookings, getCourses } from "./api.js"

const container = document.querySelector("#myBookings")

const user = JSON.parse(localStorage.getItem("user"))

if(!user){
alert("Du måste logga in")
window.location.href="login.html"
}

const loadBookings = async () => {

try{

const bookings = await getBookings()
const courses = await getCourses()

const myBookings = bookings.filter(
b => b.userId == user.id
)

container.innerHTML = ""

myBookings.forEach(booking => {

const course = courses.find(c => c.id == booking.courseId);


if(course){

container.innerHTML += `

<div class="bookingCard">

<h3>${course.title}</h3>

<p>Kursnummer: ${course.courseNumber}</p>

<p>Dagar: ${course.days}</p>

<p>Pris: ${course.price} kr</p>
<p>Namn: ${booking.name}</p>
<p>Email: ${booking.email}</p>
<p>Telefon: ${booking.phone}</p>
<p>Bokad: ${new Date(booking.date).toLocaleDateString()}</p>

</div>

`

}

})

}catch(error){

console.error(error)

container.innerHTML = "Kunde inte ladda bokningar"

}

}

loadBookings()