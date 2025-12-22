🛒 MERN Ecommerce
A full‑stack ecommerce platform built with the MERN stack, Redux Toolkit, and Material UI, delivering a smooth, modern shopping experience for both users and admins.

🚀 Overview
MERN Ecommerce is a feature‑rich application designed to simulate a real‑world online store. It includes secure authentication, product management, order handling, reviews, wishlists, and a clean UI. The project demonstrates your ability to build scalable, production‑style full‑stack applications with modern tooling and best practices.

🧰 Tech Stack
Frontend
React

Redux Toolkit

Material UI

Axios

React Router

Backend
Node.js

Express.js

MongoDB (Mongoose)

JSON Web Tokens (JWT)

Nodemailer

Development Tools
Nodemon

Vite

bcrypt

dotenv

⭐ Features
👤 User Features
Authentication  
Signup, login, logout, OTP verification, password reset

Product Reviews  
Create, edit, delete reviews with real‑time rating updates

Wishlist  
Add/remove items and attach personal notes

Shopping Cart  
Add items, adjust quantities, view subtotals

Order Management  
Create orders and view order history

Profile Management  
Update email, username, and multiple addresses

🛠️ Admin Features
Product Management  
Add, edit, delete, and soft‑delete products

Order Management  
View and update order details and status

🔐 Security & UX
JWT‑based authentication

Cookie expiration controls

OTP and password reset flows

Material UI for a clean, responsive interface

📁 Project Structure
Code
fullstack-project/
   frontend/
      src/
      public/
      package.json
   backend/
      src/
      seed/
      package.json
   LoginDemo.md
   README.md
   .gitignore
🧪 Demo Login Accounts
See LoginDemo.md for full details.

Basic demo user:

Code
email: demo@gmail.com
pass: helloWorld@123
Admin demo:

Code
email: demo2@gmail.com
pass: helloWorld@123
Note: Demo accounts cannot receive OTP or password reset emails.
To test those flows, create an account using a real email.

⚙️ Setup Instructions
Prerequisites
Node.js  v21.1.0 or later

MongoDB installed and running locally

📦 Install Dependencies
Frontend
bash
cd frontend
npm install
Backend
bash
cd backend
npm install
🔑 Environment Variables
Create a .env file inside the backend folder:

Code
MONGO_URI=mongodb://127.0.0.1:27017/Brook-Ecom
ORIGIN="http://localhost:5173"
PORT=8000

EMAIL="your-email@example.com"
PASSWORD="your-email-password"

LOGIN_TOKEN_EXPIRATION="30d"
OTP_EXPIRATION_TIME="120000"
PASSWORD_RESET_TOKEN_EXPIRATION="2m"
COOKIE_EXPIRATION_DAYS="30"

SECRET_KEY="your-secret-key"
Replace placeholder values with your own.

🌱 Seed the Database
Populate sample users, products, reviews, and carts:

bash
cd backend
node seed/seed.js
▶️ Run the Application
Backend
bash
cd backend
node index.js
Frontend
bash
cd frontend
npm run dev
🌐 Access the App
Frontend: http://localhost:5173

Backend: http://localhost:8000

👤 Author
Jason Brooks