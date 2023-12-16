"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import NextProvider from "./provider";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: 'Test Vocacional',
//   description: 'Test Vocacional de Universidad Isep',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Test Vocacional</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="16x16"></link>
      </head>
      <body className={inter.className}>
        <NextProvider>{children}</NextProvider>
      </body>
    </html>
  );
}
