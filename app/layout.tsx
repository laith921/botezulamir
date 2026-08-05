import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-title",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://botezulamir.ro"),

  title: "Botezul lui Amir | 2 octombrie 2026",

  description:
    "Vă invităm cu drag la Sfântul Botez al lui Amir, în data de 2 octombrie 2026.",

  applicationName: "Botezul lui Amir",

  authors: [
    {
      name: "Botezul lui Amir",
    },
  ],

  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://botezulamir.ro",
    siteName: "Botezul lui Amir",
    title: "Botezul lui Amir",
    description:
      "Vă invităm cu drag la Sfântul Botez al lui Amir • 2 octombrie 2026",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Invitație la botezul lui Amir",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Botezul lui Amir",
    description:
      "Vă invităm cu drag la Sfântul Botez al lui Amir • 2 octombrie 2026",
    images: ["/images/og-image.png"],
  },

  robots: {
    index: false,
    follow: false,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={`${inter.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  );
}