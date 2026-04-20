const loginForm = document.querySelector("#loginForm");

if (loginForm) {

loginForm.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.querySelector("#email").value;
const password = document.querySelector("#password").value;

try {

const response = await fetch("http://localhost:3000/users");
const users = await response.json();

const user = users.find(
u => u.email === email && u.password === password
);

if (user) {

localStorage.setItem("user", JSON.stringify(user));

alert(`Välkommen, ${user.name}!`);

window.location.href = "index.html";

} else {

alert("Fel e-post eller lösenord");

}

} catch (error) {

console.error("Login error:", error);

alert("Kunde inte logga in. Försök igen senare.");

}

});

};