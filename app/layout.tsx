import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amigo X - CEDOES",
  description: "Apresentação do Amigo X CEDOES",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}

