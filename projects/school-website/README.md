# WestCoast Education – Course Booking Application

## Overview
This project is a web-based course booking application built for **WestCoast Education**. It allows users to browse available courses, view course details, create an account, log in, and book courses online.

The application was developed as part of a web development course assignment using **Vanilla JavaScript**, **ES6 modules**, and **JSON Server** as a REST API.

---

## Features

### Public Users
Users can:
- View all available courses
- See detailed information about a course
- Register a new account
- Log in to the system
- Book a course
- View their own bookings

### Admin
Administrators can:
- Add new courses
- Delete courses
- View all bookings

---

## Technologies Used
- HTML5
- CSS3
- Vanilla JavaScript (ES6 modules)
- JSON Server (REST API)
- LocalStorage for authentication
- TypeScript
- Jest for testing
- TDD (Test-Driven Development)

---

## Project Structure
```text
westcoast-education/
├── css/
│   └── style.css
├── js/
│   ├── admin.js
│   ├── api.js
│   ├── auth.js
│   ├── booking.js
│   ├── login.js
│   ├── main.js
│   ├── myBookings.js
│   └── signup.js
├── ts/
│   ├── booking.ts
│   └── booking.test.ts
├── images/
├── db.json
├── package.json
├── jest.config.js
├── index.html
├── login.html
├── signup.html
├── booking.html
├── courseDetails.html
├── myBookings.html
├── admin.html
└── README.md
```

---

## Installation
Clone the repository or download the project.

Then install dependencies:

```bash
npm install
```

---

## Run the API
Start JSON Server:

```bash
npm run start
```

The API runs on:

```text
http://localhost:3000
```

Available endpoints:
- `/courses`
- `/users`
- `/bookings`

---

## Run Tests
This project includes a **TypeScript module tested with Jest using TDD principles**.

Run tests with:

```bash
npm test
```

Example output:

```text
PASS ts/booking.test.ts
✓ calculate booking price
```

---

## Example Users
Example users in the database:

**User 1**  
Email: `kalle@westcoast.se`  
Password: `123456`

**User 2**  
Email: `lisa@westcoast.se`  
Password: `654321`

---

## Booking Flow
1. The user registers or logs in
2. The user selects a course
3. The user fills in booking information
4. The booking is stored in the JSON Server database
5. The user can view bookings under **My Bookings**

---

## Development Principles
This project follows these development principles:

### DRY – Don't Repeat Yourself
API requests are centralized in:

```text
api.js
```

### KISS – Keep It Simple, Stupid
The application uses simple and readable JavaScript without unnecessary complexity.

---

## TypeScript and Testing
I included:
- A TypeScript module
- Unit testing with Jest
- Development based on TDD principles

Example module:
```text
ts/booking.ts
```

Example test:
```text
ts/booking.test.ts
```

---

## My Contribution
I built and structured a course booking application with both user and admin flows. I worked with frontend logic, API communication, authentication flow, and course booking functionality. I also included TypeScript and testing as part of the project requirements.

---

## What I Learned
- Building a multi-page web application with Vanilla JavaScript
- Working with REST APIs using JSON Server
- Handling login, signup, and user bookings
- Structuring JavaScript into modules for better readability
- Applying DRY and KISS principles in practice
- Writing and testing TypeScript code with Jest

---

## Challenges
One challenge was keeping the application structure clear while handling multiple pages, authentication, API requests, and bookings. This helped me improve my understanding of code organization and separation of responsibilities.

---

## Future Improvements
- Improve form validation and error messages
- Add stronger authentication and authorization
- Improve UI/UX design
- Replace JSON Server with a real backend
- Add more test coverage

---

## Project Type
Frontend / Vanilla JavaScript Web Application

---

## Author
Najma Abdaham  
Blockchain Development Student