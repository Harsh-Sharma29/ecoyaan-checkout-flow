# Ecoyaan Checkout Flow

## Description
A simplified ecommerce checkout flow built with Next.js demonstrating server-side rendering, checkout state management, and responsive UI.

## Tech Stack
- Next.js
- React
- Tailwind CSS
- Context API
- Server Side Rendering

## Features
- Server-side rendered cart page
- Checkout flow (Cart → Shipping → Payment → Success)
- Form validation
- Responsive UI
- Simulated payment

## Project Structure
```text
/app             - Next.js App Router files (pages, layouts, API routes)
/components      - Reusable React components (OrderSummary, AddressForm, etc.)
/context         - React Context API for global state management
/public          - Static assets like images and icons
README.md        - Project documentation
package.json     - Project dependencies and scripts
tailwind.config.ts - Tailwind CSS configuration
```

## How to Run Locally

```bash
npm install
npm run dev
```

## Deployment

### Option A: Vercel (Recommended)
1. Go to https://vercel.com and log in.
2. Import GitHub repository: `ecoyaan-checkout-flow`.
3. Select framework preset: **Next.js**.
4. Set build command to: `npm run build`.
5. Click **Deploy**.
6. Wait for the build to finish to get your generated live URL.

### Option B: Netlify
1. Go to https://netlify.com and log in.
2. Import GitHub repository.
3. Set build command to: `npm run build`.
4. Set publish directory to: `.next`.
5. Click **Deploy**.
