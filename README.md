# Ecoyaan Checkout Flow Assignment

A simplified ecommerce checkout flow built with **Next.js (App Router)**, **React**, **Tailwind CSS**, **Server-Side Rendering**, and **Context API** for state management.

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16+ (App Router) | Framework — SSR, file-based routing, API routes |
| **React** | 19 | UI library |
| **TypeScript** | 5+ | Type safety |
| **Tailwind CSS** | 4 | Utility-first styling |
| **Context API** | — | Client-side state management |

---

## Features

- **SSR cart rendering** — Cart data is fetched server-side using Next.js Server Components with Suspense-based streaming and a skeleton loading UI.
- **Checkout flow** — Complete 4-step flow: **Cart → Shipping → Payment → Success**, with a visual step indicator tracking progress.
- **Form validation** — Real-time inline validation with:
  - Email format check
  - 10-digit phone number validation
  - 6-digit PIN code validation
  - All fields required (with red asterisk indicators)
  - "Continue to Payment" button disabled until all fields are valid
- **Responsive UI** — Mobile-friendly layout using Tailwind CSS, with card-based components and responsive grid layouts.
- **Simulated payment** — Mock credit card UI with a "Pay Securely" button that shows a processing spinner and disables on click to prevent double submission. Includes a clear disclaimer noting the simulated nature.
- **Loading states** — Skeleton loader with Tailwind `animate-pulse` while cart data loads, plus spinner fallbacks on each page guard.
- **Page guards** — Each step validates required context data and redirects if incomplete.

---

## Project Structure

```
ecoyaan-checkout/
├── app/
│   ├── layout.tsx                 # Root layout — header, footer, CheckoutProvider
│   ├── globals.css                # Global styles & custom animations
│   ├── page.tsx                   # Cart page (Server Component — SSR + Suspense)
│   ├── CartPageClient.tsx         # Cart page client-side logic
│   ├── checkout/
│   │   └── page.tsx               # Shipping address form page
│   ├── payment/
│   │   └── page.tsx               # Payment confirmation page
│   ├── success/
│   │   └── page.tsx               # Order success page
│   └── api/
│       └── cart/
│           └── route.ts           # Mock REST API (GET /api/cart)
├── components/
│   ├── CartItem.tsx               # Individual cart item card
│   ├── CartSkeleton.tsx           # Skeleton loading UI for cart page
│   ├── OrderSummary.tsx           # Order total breakdown
│   ├── AddressForm.tsx            # Validated shipping address form
│   └── StepIndicator.tsx          # Reusable checkout step indicator
├── context/
│   └── CheckoutContext.tsx        # React Context for cart, address & order state
├── next.config.ts                 # Image domains configuration
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind CSS configuration
└── package.json
```

---

## How to Run Locally

### Prerequisites

- **Node.js** 18 or higher
- **npm**

### Steps

```bash
# 1. Clone the repository
git clone <repo-url>
cd ecoyaan-checkout

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Deployment Instructions

### Vercel (Recommended)

This project is **Vercel-ready** out of the box — no extra configuration needed.

**Option A — via Dashboard:**

1. Push your code to GitHub / GitLab / Bitbucket
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Vercel auto-detects Next.js — click **Deploy**

**Option B — via CLI:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

Any platform that supports Next.js can deploy this project:

- **Netlify** — Use the `@netlify/plugin-nextjs` plugin
- **Railway** — Auto-detects Next.js, deploy with `npm run build && npm start`
- **Docker** — Use the official [Next.js Docker example](https://github.com/vercel/next.js/tree/canary/examples/with-docker)

---

## License

MIT
