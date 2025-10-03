import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Apply Digital Test",
  description: "Frontend development test for Apply Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
