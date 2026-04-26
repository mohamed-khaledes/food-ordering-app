# 🥗 Akla — Smart Food Ordering Platform

<div align="center">

![Akla Banner](https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=400&fit=crop)

**Chef-crafted meals with locally sourced ingredients, delivered to your door.**  
Powered by seamless Paymob payment integration.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma)](https://prisma.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=flat-square&logo=postgresql)](https://neon.tech)

[Live Demo](https://akla-pi.vercel.app) · [Report Bug](https://github.com/yourusername/akla/issues)
· [Request Feature](https://github.com/yourusername/akla/issues)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Paymob Integration](#paymob-integration)
- [User Roles](#user-roles)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Deployment](#deployment)
- [Screenshots](#screenshots)

---

## 🍽️ About

**Akla** (Arabic: أكلة — meaning "a meal") is a full-stack food ordering platform built for the
Egyptian market. It allows customers to browse a dynamic menu, customize their meals with sizes and
extras, place orders with cash on delivery or pay securely via Paymob card integration, and track
their orders in real time through a multi-step status flow.

The platform includes a complete admin dashboard for managing products, categories, users, and
orders — as well as a dedicated delivery man portal for order pickup and delivery confirmation.

---

## ✨ Features

### Customer

- Browse meals by category with a sticky filter bar
- Customize orders with sizes and extra ingredients
- Add to cart with quantity controls
- Checkout with cash on delivery or card payment via Paymob
- Real-time order tracking with a 5-step progress stepper
- Bilingual support (Arabic 🇪🇬 / English 🇬🇧) with RTL layout

### Admin Dashboard

- Full analytics overview (revenue, orders, users, menu items)
- Manage categories, products (with image upload, sizes, extras)
- Manage users and assign delivery man roles
- View and update order statuses
- Assign specific delivery men to orders

### Delivery Man Portal

- Dedicated dashboard with delivery stats
- View available orders ready for pickup
- Pick up orders and mark as delivered
- Profile management

### Payment

- Paymob hosted iframe integration (card payments)
- HMAC webhook verification
- Automatic order status update on payment success
- Cash on delivery support

---

## 🛠️ Tech Stack

| Layer            | Technology              |
| ---------------- | ----------------------- |
| Framework        | Next.js 15 (App Router) |
| Language         | TypeScript              |
| Styling          | Tailwind CSS v4         |
| UI Components    | shadcn/ui               |
| Database         | PostgreSQL (Neon)       |
| ORM              | Prisma 7                |
| Authentication   | NextAuth.js             |
| State Management | Redux Toolkit           |
| Animations       | Framer Motion           |
| Payment          | Paymob                  |
| Deployment       | Vercel                  |
| Fonts            | Geist Sans / Cairo      |

---

## 🏗️ Architecture

```
akla/
├── app/
│   ├── [locale]/               # i18n routing (en / ar)
│   │   ├── (main)/             # Public layout (header + footer)
│   │   │   ├── page.tsx        # Landing page
│   │   │   ├── menu/           # Menu with category filter
│   │   │   ├── cart/           # Cart + checkout
│   │   │   ├── orders/         # User order tracking
│   │   │   ├── payment-success/
│   │   │   └── payment-failed/
│   │   ├── admin/              # Admin dashboard (ADMIN only)
│   │   │   ├── page.tsx        # Analytics overview
│   │   │   ├── categories/
│   │   │   ├── menu-items/
│   │   │   ├── users/
│   │   │   ├── orders/
│   │   │   └── delivery/
│   │   ├── dashboard/          # Delivery portal (DELIVERY only)
│   │   │   ├── page.tsx        # Delivery overview
│   │   │   ├── orders/
│   │   │   └── profile/
│   │   └── auth/               # Sign in / Sign up
│   └── api/
│       ├── orders/             # Order creation
│       ├── payments/
│       │   └── paymob/         # Paymob integration + webhook
│       └── auth/               # NextAuth handlers
├── features/                   # Feature-based modules
├── components/                 # Shared UI components
├── prisma/                     # Schema + migrations + seed
└── lib/                        # Utilities, helpers, cache
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm
- PostgreSQL database (or [Neon](https://neon.tech) free tier)
- [Paymob](https://accept.paymob.com) account (for card payments)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/akla.git
cd akla

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your values (see Environment Variables section)

# 4. Generate Prisma client
npx prisma generate

# 5. Run migrations
npx prisma migrate deploy

# 6. Seed the database (optional)
npx prisma db seed

# 7. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

Create a `.env` file in the root of the project:

```env
# ── Database ──────────────────────────────────────────────
# Pooled URL (for app queries)
DATABASE_URL="postgresql://USER:PASSWORD@HOST-pooler.region.aws.neon.tech/DATABASE?sslmode=require"

# ── NextAuth ──────────────────────────────────────────────
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# ── Paymob ────────────────────────────────────────────────
PAYMOB_API_KEY="your-paymob-api-key"
PAYMOB_INTEGRATION_ID="your-integration-id"
PAYMOB_IFRAME_ID="your-iframe-id"
PAYMOB_HMAC_SECRET="your-hmac-secret"

# ── App ───────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🗄️ Database Setup

Akla uses **Prisma 7** with **Neon PostgreSQL**. The datasource URL is configured in
`prisma.config.ts` rather than the schema file (Prisma 7 requirement).

**`prisma.config.ts`**

```ts
import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'npx tsx ./prisma/seed.ts'
  },
  datasource: {
    url: env('DATABASE_URL')
  }
})
```

### Database Models

| Model          | Description                                |
| -------------- | ------------------------------------------ |
| `User`         | Customers, admins, and delivery men        |
| `Product`      | Menu items with sizes and extras           |
| `Category`     | Product categories                         |
| `Order`        | Customer orders with delivery info         |
| `OrderProduct` | Junction table for order items             |
| `Sizes`        | Product size variants (S/M/L)              |
| `Extras`       | Optional ingredients (cheese, bacon, etc.) |

### Seeding

```bash
npx prisma db seed
```

This creates 5 categories (Bowls, Wraps, Salads, Soups, Juices) with 14 products total, each with
sizes and extras.

---

## 💳 Paymob Integration

Akla integrates with [Paymob Accept](https://accept.paymob.com) for card payments in Egypt (EGP).

### Flow

```
Customer fills checkout form
        ↓
POST /api/payments/paymob
        ↓
1. Authenticate with Paymob API
2. Create Paymob order
3. Generate payment key
4. Save pending order to DB
5. Return hosted payment URL
        ↓
Customer redirected to Paymob iframe
        ↓
Customer pays
        ↓
Paymob calls webhook GET /api/payments/paymob/webhook
        ↓
HMAC verified → order marked as PAID in DB
        ↓
Customer redirected to /payment-success
```

### Setup

1. Register at [accept.paymob.com](https://accept.paymob.com)
2. **Settings → Account Info** → copy API Key
3. **Developers → Payment Integrations** → Create Card integration → copy Integration ID
4. **Developers → Payment Iframes** → Create iframe → copy Iframe ID
5. **Settings → Security Settings** → copy HMAC Secret
6. Set callback URL in Paymob dashboard:
   ```
   https://yourdomain.com/api/payments/paymob/webhook
   ```

### Test Cards

| Card                 | Number             | Expiry     | CVV      |
| -------------------- | ------------------ | ---------- | -------- |
| Visa (success)       | `4987654321098769` | Any future | `123`    |
| Mastercard (success) | `5123456789012346` | `12/25`    | `123`    |
| OTP                  | —                  | —          | `123456` |

---

## 👥 User Roles

| Role       | Access                                                        |
| ---------- | ------------------------------------------------------------- |
| `USER`     | Browse menu, place orders, track own orders                   |
| `ADMIN`    | Full dashboard access, manage everything, assign delivery men |
| `DELIVERY` | Delivery portal, pick up orders, mark as delivered            |

### Role Assignment

- New users default to `USER`
- Admin role must be set directly in the database or via the admin dashboard
- Delivery role is assigned by an admin via **Admin Dashboard → Delivery Men**

---

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── fields/                 # Form field components
│   └── layouts/                # Header, footer, etc.
├── features/
│   ├── admin/                  # Admin dashboard features
│   │   ├── categories/
│   │   ├── delivery/
│   │   ├── menu-items/
│   │   ├── orders/
│   │   └── users/
│   ├── auth/                   # Sign in / sign up forms
│   ├── cart/                   # Cart state + checkout
│   ├── delivery/               # Delivery man portal
│   ├── home/                   # Landing page sections
│   ├── orders/                 # Order actions + user orders
│   ├── profile/                # Profile form
│   └── shared/                 # Shared components (Card, AddToCart)
├── lib/
│   ├── prisma.ts               # Prisma client
│   ├── cache.ts                # Next.js cache wrapper
│   ├── helpers.ts              # formatCurrency, etc.
│   └── translations/           # i18n server/client utils
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── redux/                      # Redux store + hooks
├── server/
│   ├── auth.ts                 # NextAuth config
│   └── db/                     # DB query functions
├── constants/
│   └── enums.ts                # Routes, Pages, Languages
├── types/                      # TypeScript types
└── validations/                # Zod schemas
```

---

## 🔌 API Routes

| Method     | Route                          | Description                | Auth     |
| ---------- | ------------------------------ | -------------------------- | -------- |
| `POST`     | `/api/orders`                  | Create a new order         | Required |
| `POST`     | `/api/payments/paymob`         | Initialize Paymob payment  | Required |
| `GET`      | `/api/payments/paymob/webhook` | Paymob payment callback    | HMAC     |
| `POST`     | `/api/payments/paymob/webhook` | Paymob transaction webhook | —        |
| `GET/POST` | `/api/auth/[...nextauth]`      | NextAuth handlers          | —        |

---

## 📦 Order Status Flow

```
PENDING → PAID → PREPARING → OUT_FOR_DELIVERY → DELIVERED
                                                      ↓
                                                 CANCELLED (any stage)
```

| Status             | Set By                     |
| ------------------ | -------------------------- |
| `PENDING`          | System (on order creation) |
| `PAID`             | Paymob webhook             |
| `PREPARING`        | Admin                      |
| `OUT_FOR_DELIVERY` | Admin or Delivery man      |
| `DELIVERED`        | Admin or Delivery man      |
| `CANCELLED`        | Admin                      |

---

## 🌍 Internationalization

Akla supports Arabic and English with full RTL layout for Arabic.

```
/en/menu        → English
/ar/menu        → Arabic (RTL)
```

Translations are stored in JSON files and accessed via `getTrans()` (server) and `useTrans()`
(client).

---

## 🚢 Deployment

Akla is deployed on **Vercel** with **Neon PostgreSQL**.

### Vercel Setup

1. Push your code to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add all environment variables in **Settings → Environment Variables**
4. Set the build command:
   ```
   next build --no-lint
   ```
5. Deploy

### Production Checklist

- [ ] All environment variables set in Vercel
- [ ] Paymob callback URL updated to production domain
- [ ] `NEXTAUTH_URL` set to production URL
- [ ] `NEXT_PUBLIC_APP_URL` set to production URL
- [ ] Database migrations run (`npx prisma migrate deploy`)
- [ ] First admin user created

---

## 📸 Screenshots

| Page     | Description                                  |
| -------- | -------------------------------------------- |
| Landing  | Hero section with animated meal illustration |
| Menu     | Category filter + product grid               |
| Cart     | Cart items + cash/card checkout              |
| Orders   | Real-time order tracking with stepper        |
| Admin    | Analytics dashboard with revenue stats       |
| Delivery | Delivery man portal with available orders    |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

```bash
# 1. Fork the repo
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m 'Add amazing feature'

# 4. Push to the branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

Built with ❤️ for the Egyptian food market.

> _Akla — Food that fuels your best days._

---

<div align="center">

⭐ Star this repo if you found it helpful!

</div>
