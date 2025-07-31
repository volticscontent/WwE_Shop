import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/hooks/useCart";
import PixelScripts from "@/components/PixelScripts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WWE Store",
  description: "Official WWE merchandise and collectibles",
  icons: {
    icon: "/WWE_SummerSlam_logo_2023.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Meta Pixel noscript fallback */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=1668631617186203&ev=TotalPageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          {children}
          {/* Todos os scripts de pixel são carregados aqui */}
          <PixelScripts />
        </CartProvider>
      </body>
    </html>
  );
}
