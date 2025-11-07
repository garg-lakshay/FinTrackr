# 🪙 FinTrackr — Smart Personal Finance Tracker

FinTrackr is a **Next.js 16 + Prisma + PostgreSQL** powered personal finance management application.
It helps users **track income, expenses, and balances**, view transaction analytics, and visualize data in an elegant dashboard.

---

## 🚀 Tech Stack

| Category           | Technology                                                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**       | [Next.js 16 (App Router)](https://nextjs.org/)                                                                                |
| **UI / Styling**   | [TailwindCSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Lucide Icons](https://lucide.dev/) |
| **Backend**        | Next.js API Routes                                                                                                            |
| **ORM**            | [Prisma ORM](https://www.prisma.io/)                                                                                          |
| **Database**       | [PostgreSQL](https://www.postgresql.org/)                                                                                     |
| **Auth**           | JWT-based authentication                                                                                                      |
| **Hosting**        | [Vercel](https://vercel.com/)                                                                                                 |
| **SEO & OG Image** | Static Open Graph image (hosted in `/public/og-image.png`)                                                                    |

---

## ⚙️ Features

### 🔐 Authentication

* JWT authentication system.
* Token stored securely in `localStorage`.
* Middleware-protected routes for dashboard access.

### 📊 Dashboard

* Displays:

  * Current total balance
  * Recent transactions
  * Quick navigation cards for actions
* Responsive, minimal UI with light theme.

### ➕ Add Transaction

* Add income or expense with:

  * Name
  * Amount
  * Type (INCOME / EXPENSE)
  * Category
  * Date
* Clean form validation and feedback (success/error alerts).

### 💰 Income / Expense Tracker

* Filter and search transactions by name or type.
* Displays total income or expense at top.
* Professional table layout with responsive design.

### 📅 Calendar View

* Interactive monthly calendar.
* Click a date to view all transactions on that day.
* Smooth animations and visual consistency.

### 📆 Date Range Transactions

* API support for fetching transactions between specific dates.
* Ideal for analytics or monthly reports (UI under development).

### 🧠 SEO + Open Graph

* SEO-optimized meta tags and structured metadata.
* Static Open Graph image `/og-image.png` used for consistent link previews across all pages.

---

## 🧩 Folder Structure

```
app/
 ├─ api/
 │   ├─ dashboard/
 │   │   ├─ add-transaction/route.ts
 │   │   ├─ balance/route.ts
 │   │   ├─ transactions/route.ts
 │   │   ├─ income/
 │   │   ├─ expense/
 │   │   └─ date/
 │
 ├─ dashboard/
 │   ├─ page.tsx            # Dashboard UI
 │   ├─ add-transaction/page.tsx
 │   ├─ income/page.tsx
 │   ├─ expense/page.tsx
 │   ├─ calendar/page.tsx
 │   └─ range/page.tsx      # (Planned)
 │
 ├─ layout.tsx
 └─ globals.css
```

---

## 🧾 Prisma Schema (Simplified)

```prisma
model Transaction {
  id        Int      @id @default(autoincrement())
  userId    Int
  name      String
  amount    Float
  type      String   // 'INCOME' or 'EXPENSE'
  category  String
  date      DateTime
  User      User     @relation(fields: [userId], references: [id])
}
```

---

## 🧱 Setup Instructions

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/lakshaygarg/fintrackr.git
cd fintrackr
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/fintrackr
JWT_SECRET=your_secret_key
NEXT_PUBLIC_BASE_URL=https://fintrackr-lg.vercel.app
```

### 4️⃣ Run Prisma Migrations

```bash
npx prisma migrate dev
```

### 5️⃣ Start Dev Server

```bash
npm run dev
```

---

## 🧭 API Endpoints Overview

| Endpoint                         | Description                |
| -------------------------------- | -------------------------- |
| `/api/dashboard/balance`         | Get total balance          |
| `/api/dashboard/transactions`    | Get recent transactions    |
| `/api/dashboard/add-transaction` | Add a new transaction      |
| `/api/dashboard/income/...`      | Income data                |
| `/api/dashboard/expense/...`     | Expense data               |
| `/api/dashboard/date`            | Fetch transactions by date |
| `/api/dashboard/date-range`      | Fetch by date range        |

---

## 📸 SEO Configuration

* **Static OG Image:** `/public/og-image.png`
* **Metadata:** Defined in `layout.tsx`

  ```ts
  export const metadata = {
    title: "FinTrackr — Smart Personal Finance Tracker",
    description: "Track your income and expenses effortlessly with FinTrackr.",
    openGraph: {
      title: "FinTrackr",
      description: "Your personal finance dashboard.",
      images: ["/og-image.png"],
      url: "https://fintrackr-lg.vercel.app",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "FinTrackr — Smart Personal Finance Tracker",
      description: "Track and manage your money smarter.",
      images: ["/og-image.png"],
    },
  };
  ```

---

## 👨‍💻 Author

**Lakshay Garg**


---
