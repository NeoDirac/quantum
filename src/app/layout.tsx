import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mecánica Cuántica · Griffiths Cap. 2 — Plataforma de estudio",
  description: "Plataforma interactiva para aprender a resolver problemas de mecánica cuántica (Griffiths, Capítulo 2): conceptos en capas, ejercicios guiados, pistas progresivas, botón '¿Por qué?' y modo examen.",
  keywords: ["mecánica cuántica", "Griffiths", "Schrödinger", "pozo infinito", "oscilador armónico", "tunneling", "estudio interactivo"],
  authors: [{ name: "Plataforma de estudio QM" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
