# Budget Tracker App

A modern budget tracking application built with React, Vite, Bootstrap, Firebase Firestore and localStorage.

## 📌 Project Purpose

This project allows users to manage their income and expenses through a clean and responsive web interface.

Users can add income and expense records, view all transactions in a table, calculate total income, total expense and remaining balance dynamically.

## 🚀 Technologies Used

- React
- Vite
- JavaScript
- Bootstrap
- Firebase Firestore
- localStorage
- HTML5
- CSS3
- Git & GitHub

## ✨ Features

- Add income records
- Add expense records
- Show all transactions in a table
- Calculate total income
- Calculate total expense
- Calculate remaining balance
- Store data in Firebase Firestore
- Cache data with localStorage
- Delete single transaction
- Delete all transactions
- Upload sample seed data
- Prevent duplicate sample data upload
- Loading spinner while uploading data
- Responsive Bootstrap design

## 🧠 What I Learned

In this project, I practiced:

- React component structure
- React state management with `useState`
- Page lifecycle with `useEffect`
- Firebase Firestore CRUD operations
- Data filtering with `filter()`
- Total calculation with `reduce()`
- Rendering lists with `map()`
- Bootstrap grid system
- localStorage cache logic
- GitHub repository management


Document fields:

```js
{
  title: "Maaş",
  amount: 15000,
  type: "income",
  category: "İş",
  date: "2026-05-01",
  createdAt: Date
}
```

## 🔥 Firebase Usage

Firebase Firestore is used as the main database system.

The application reads transaction data from Firestore, adds new records to Firestore, deletes records from Firestore and updates the interface dynamically.

## 💾 localStorage Usage

localStorage is used as a cache system.

When the page opens, previously fetched transactions can be loaded quickly from localStorage. After Firestore data is fetched, localStorage is updated again.

## 🧩 CRUD Operations

This project includes:

```txt
Create → Add new income or expense
Read   → Fetch transactions from Firestore
Delete → Delete single or all transactions
```

Update operation is not included in this version.

## 📦 Installation

Clone the project:

```bash
git clone https://github.com/el-xearl/budget-tracker-app.git
```

Go to project folder:

```bash
cd budget-tracker-app
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

## ⚙️ Firebase Setup

Create a Firebase project and add your Firebase config inside:

```txt
src/firebase.js
```

Example:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```




## 👨‍💻 Developer

**Serhat Özdamar**

- GitHub: [el-xearl](https://github.com/el-xearl)
- Portfolio: [serhat-portfolio.vercel.app](https://serhat-portfolio.vercel.app)

## Contributor

Ayberk contributed to documentation improvements.

## 📄 License

This project is created for educational purposes.
