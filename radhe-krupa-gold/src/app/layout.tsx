import type { Metadata } from "next";
// Change these two lines:
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import "./globals.css";
import Header from "@/components/Home/Header/Header";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
    title: "Radhe Krupa Gold Coin",
    description: "Gold production and development company",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        {/* Use the .variable property from the imported local fonts */}
        <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <CartProvider>
            <Header />
            <main style={{ minHeight: "70vh" }}>
                {children}
            </main>
            <Footer />
        </CartProvider>
        </body>
        </html>
    );
}