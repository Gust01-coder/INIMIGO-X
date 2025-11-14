import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inimigo X - CEDOES",
  description: "Apresentação do Inimigo X CEDOES",
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

