import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CheckoutProvider } from "@/context/CheckoutContext";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ecoyaan Checkout — Sustainable Shopping",
  description:
    "Complete your eco-friendly purchase with our seamless checkout experience. Fast, secure, and green.",
  keywords: ["ecoyaan", "eco-friendly", "checkout", "sustainable", "shopping"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {/* Top gradient bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 z-50" />

        <CheckoutProvider>
          <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="sticky top-1 z-40 backdrop-blur-md bg-white/70 border-b border-gray-100">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <a href="/" className="flex items-center gap-2 group">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-transform duration-300 group-hover:scale-110">
                    E
                  </span>
                  <span className="text-lg font-bold text-gray-800 tracking-tight">
                    eco<span className="text-gradient">yaan</span>
                  </span>
                </a>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                  </svg>
                  Secure Checkout
                </div>
              </div>
            </header>

            {/* Main */}
            <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
              {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-100 bg-white/50 backdrop-blur-sm">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-gray-400">
                © 2026 Ecoyaan. Sustainable shopping, delivered with care 🌿
              </div>
            </footer>
          </div>
        </CheckoutProvider>
      </body>
    </html>
  );
}
