import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Best Movies",
  description: "Created by flczin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
