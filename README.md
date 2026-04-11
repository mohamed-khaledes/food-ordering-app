# 🍔 Full‑Stack Food Ordering Platform
LIVE: https://akla-pi.vercel.app/en
<img width="1901" height="917" alt="Screenshot_18" src="https://github.com/user-attachments/assets/105298fc-79c5-4e32-b404-45e26e2a3add" />

A **production‑ready full‑stack food ordering application** built with **Next.js App Router**, **Prisma**, **PostgreSQL**, and **Stripe**.
This project demonstrates **real‑world backend architecture**, **secure payment handling**, and **scalable database design** — exactly how modern e‑commerce systems are built.

> ⚠️ This is **not a demo or tutorial app**. It follows **industry best practices** used in real production systems.

---

## 🎯 What This Project Demonstrates

* Designing **secure payment systems** with Stripe
* Building **server‑trusted pricing logic** (anti‑fraud)
* Modeling complex relational data with Prisma
* Writing scalable, transaction‑safe backend code
* Structuring a clean, maintainable Next.js App Router project

---

## ✨ Key Features

* 🛒 Product catalog with **categories, sizes & extras**
* 🧮 **Server‑side price calculation** (client cannot manipulate totals)
* 💳 **Stripe Payment Intents** (Cards, Apple Pay, Google Pay)
* 🔔 **Stripe Webhooks** as the single source of truth
* 📦 Order lifecycle management (`PENDING → PAID → DELIVERED`)
* 🔐 Zod validation for all critical inputs
* ⚡ Optimized database queries (no N+1 issues)
* 🧾 Transaction‑safe order creation

---

## 🧱 Tech Stack

**Frontend**

* Next.js (App Router)
* React
* TypeScript

**Backend**

* Next.js API Routes
* Prisma ORM
* PostgreSQL

**Payments**

* Stripe Payment Intents
* Stripe Webhooks

**Validation & Safety**

* Zod
* Prisma Transactions

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── payments/create-intent/   # Create Stripe PaymentIntent
│   │   ├── webhooks/stripe/           # Stripe webhook (order creation)
│   │   └── orders/                    # Fetch orders
│   │
│   ├── checkout/                      # Checkout UI
│   └── payment-success/               # Success page
│
├── lib/
│   ├── prisma.ts                      # Prisma client
│   └── stripe.ts                      # Stripe server client
│
├── features/
│   └── cart/validations.ts            # Zod schemas
│
└── prisma/schema.prisma               # Database schema
```

---

## 🔐 Payment Architecture (Industry‑Standard)

```
Client Checkout
   ↓
Create PaymentIntent (Server)
   ↓
Confirm Payment (Client)
   ↓
Stripe Webhook
   ↓
Create PAID Order (Server)
```

✔ Orders are **never created before payment succeeds**
✔ Stripe is the **source of truth**
✔ Webhooks guarantee reliability even if the client disconnects

---

## ⚙️ Environment Variables

```env
DATABASE_URL=postgresql://...

STRIPE_SECRET_KEY=sk_test_XXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXX
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_XXXX
```

---

## 🚀 Running the Project Locally

```bash
npm install
npx prisma migrate dev
npm run dev
```

---

## 🧪 Stripe Local Testing

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Test card:

```
4242 4242 4242 4242
```

---

## 🧠 Engineering Highlights (For Recruiters)

* ✔ Stripe‑first payment architecture (no fake orders)
* ✔ Secure server‑side pricing logic
* ✔ Correct webhook handling & idempotency
* ✔ Prisma relational modeling & transactions
* ✔ Clean separation between client, server & services
* ✔ Scalable structure suitable for real production use

---

## 🔮 Possible Extensions

* Admin dashboard for order management
* Refunds & cancellations via Stripe
* Inventory & stock validation
* Email / WhatsApp notifications
* Multi‑currency support

---

## 👨‍💻 Mohamed Khaled

This project was built to showcase **real backend & full‑stack engineering skills**, focusing on **correct architecture**, **security**, and **scalability** rather than UI demos.

If you’re a recruiter or hiring manager, this repository reflects how I approach **production‑level systems**.

---

⭐ If you find this project interesting, feel free to star or fork it.
