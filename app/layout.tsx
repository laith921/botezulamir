import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
} from "next/font/google";
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

  title: {
    default: "Botezul lui Amir",
    template: "%s | Botezul lui Amir",
  },

  description:
    "Vă invităm cu drag să fiți alături de noi la Sfântul Botez al lui Amir • 2 octombrie 2026 • Arad.",

  applicationName: "Botezul lui Amir",

  keywords: [
    "botez",
    "Amir",
    "invitație",
    "Botezul lui Amir",
    "Arad",
    "2 octombrie 2026",
  ],

  authors: [
    {
      name: "Familia Naaji",
    },
  ],

  creator: "Familia Naaji",

  publisher: "Familia Naaji",

  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://botezulamir.ro",
    siteName: "Botezul lui Amir",

    title: "Botezul lui Amir",

    description:
      "Vă invităm cu drag la Sfântul Botez al lui Amir • 2 octombrie 2026 • Arad.",

    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Invitația la botezul lui Amir",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Botezul lui Amir",

    description:
      "Vă invităm cu drag la Sfântul Botez al lui Amir • 2 octombrie 2026 • Arad.",

    images: ["/images/og-image.png"],
  },

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
    ],

    shortcut: "/favicon.ico",

    apple: [
      {
        url: "/favicon.ico",
      },
    ],
  },

  alternates: {
    canonical: "https://botezulamir.ro",
  },

  category: "eveniment privat",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body
        className={`${inter.variable} ${cormorant.variable}`}
      >
        {children}
      </body>
    </html>
  );
}