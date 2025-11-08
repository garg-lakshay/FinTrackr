# 🪙 FinTrackr — Smart Personal Finance Tracker

**FinTrackr** is a modern **Next.js 16** web application designed to help users manage their personal finances.
It provides an elegant dashboard to track **income, expenses, and transfers**, with secure authentication and a clean, data-driven UI.

---

## 🚀 Tech Stack

| Layer          | Technology                                  |
| -------------- | ------------------------------------------- |
| **Framework**  | Next.js 16 (App Router)                     |
| **Database**   | PostgreSQL                                  |
| **ORM**        | Prisma                                      |
| **Styling**    | TailwindCSS + Framer Motion                 |
| **Auth**       | JWT (JSON Web Token)                        |
| **Deployment** | Vercel                                      |
| **SEO / OG**   | Static Open Graph image for social previews |

---

## ⚙️ Core Features

### 🔐 Authentication

* Secure login with JWT tokens.
* Middleware-protected dashboard and API routes.

### 💰 Transaction Management


* Add, edit, and view transactions categorized as:

  * **INCOME**
  * **EXPENSE**
  * **TRANSFER**
* Each transaction includes: name, amount, category, note, and date.

### 📊 Dashboard Overview

* Displays total balance and recent activity.
* Quick navigation to add transactions, check income/expenses, or open the calendar view.

### 💸 Income & Expense Pages

* Dedicated pages with total summaries and search filters.
* Clean, color-coded data tables.

### 📅 Calendar View

* Interactive monthly calendar to browse transactions by date.
* Responsive and intuitive design.

### 🧭 Date Range Filtering

* Backend supports fetching transactions within a specific time range (useful for reports and insights).

### 🌐 SEO & Meta Configuration

* Static Open Graph image used for consistent link previews.
* Optimized metadata for each route.

---

## 🧩 Data Model Overview

FinTrackr uses a relational model via Prisma ORM:

* **User** → manages authentication and relationships.
* **Transaction** → linked to a user and includes fields for `amount`, `category`, `type`, `date`, and optional notes.
* Supports multiple transaction types: `INCOME`, `EXPENSE`, and `TRANSFER`.

---

## 🧱 Project Setup

```bash
git clone https://github.com/lakshaygarg/fintrackr.git
cd fintrackr
npm install
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/fintrackr
JWT_SECRET=your_secret_key
```

Then:

```bash
npx prisma migrate dev
npm run dev
```

---

## 📍 API Overview

| Endpoint                         | Description                            |
| -------------------------------- | -------------------------------------- |
| `/api/dashboard/balance`         | Get total balance                      |
| `/api/dashboard/transactions`    | Fetch recent transactions              |
| `/api/dashboard/add-transaction` | Add a new income, expense, or transfer |
| `/api/dashboard/income`          | Get income transactions                |
| `/api/dashboard/expense`         | Get expense transactions               |
| `/api/dashboard/date`            | Transactions by date                   |
| `/api/dashboard/date-range`      | Transactions within date range         |

---

## 👨‍💻 Author

**Lakshay Garg**

---

> *FinTrackr combines clarity, security, and simplicity — helping users make smarter financial decisions.*
