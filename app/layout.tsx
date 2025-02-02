import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navigation";

const oswald = Montserrat({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["italic", "normal"],
});
export const metadata: Metadata = {
  title: "Gestor de proyectos",
  description: "Administracion de proyectos",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${oswald.className} antialiased`}>
        <Navbar />

        {children}
      </body>
    </html>
  );
}
