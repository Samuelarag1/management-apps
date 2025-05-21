import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Freelance Project Manager",
  description: "Gestiona tus proyectos freelance de manera eficiente",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Freelance PM",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <Toaster position="top-center" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
