const signupForm = document.querySelector("#signupForm");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const newUser = { name, email, password };

  try {
    // Hämta existerande användare
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();

    if (users.some(u => u.email === email)) {
      alert("Det finns redan ett konto med den e-postadressen.");
      return;
    }

    // Skapa nytt konto
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });

    alert("Registrering lyckades! Du kan nu logga in.");
    window.location.href = "login.html";
  } catch (error) {
    console.error(error);
    alert("Kunde inte registrera konto. Försök igen senare.");
  }
});