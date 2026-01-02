

### TheBookStop – MERN Online Bookstore Project

TheBookStop is a complete MERN stack online bookstore application where users can browse books, add to cart, wishlist, purchase (dummy payment), and manage their profiles. The system also includes dedicated dashboards for Sellers and Admins to manage books, users, and platform activities.

## Features

# User Features
- User authentication and login
- Browse all books
- Search books by title, author, or genre
- Add books to Cart
- Add books to Wishlist
- Place Orders (Dummy Payment System)
- View Order History
- Add Book Reviews
- Manage Profile

# Seller Features
- Secure Seller Login
- Add New Books
- Edit and Delete Books
- View Product List
- Seller Dashboard (Book Count, Orders Info)

# Admin Features
- Admin Dashboard with stats
- Manage Users (Block / Unblock / Delete)
- Manage Sellers (Block / Unblock / Delete)
- View Books
- View Orders

## Tech Stack

# Frontend
- React JS
- Axios
- Bootstrap / CSS

# Backend
- Node JS
- Express JS
- MongoDB + Mongoose
- JWT Authentication
- Multer (Image Upload)

# Database
- MongoDB Compass / MongoDB Atlas

---

## Setup Instructions

# Clone Repository
```
git clone <repository-url>
cd BookStore
```

---

# Backend Setup

```
cd backend
npm install
```

Create `.env` file in backend folder:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/bookstore
JWT_SECRET=your_secret_key
```

Run Backend
```
npm start
```

Backend runs at:
```
http://localhost:5000
```

---

# Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

## Image Upload Note
Book cover images are stored inside:
```
backend/uploads

## Roles Available
- User
- Seller
- Admin (Create manually in DB initially)


