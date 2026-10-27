import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tran An Phu | Computer Science, Engineering & Community",
  description:
    "Explore Tran An Phu’s research, engineering projects, community leadership and interest in horseback riding. Class of 2027.",
  keywords: [
    "Tran An Phu",
    "computer science portfolio",
    "animal movement research",
    "engineering student",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
