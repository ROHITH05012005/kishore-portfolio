import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kishorenayak.in.net"),
  title: {
    default: "Kishore Nayak | Creative Director & Fashion Choreographer",
    template: "%s | Kishore Nayak",
  },
  description: "Official website of Kishore Nayak — Creative Director, Fashion Choreographer, and Performance Coach specializing in fashion show direction and runway performance.",
  keywords: [
    "Kishore Nayak",
    "Kishore Nayak Portfolio",
    "Kishore Nayak Creative Director",
    "Kishore Nayak Fashion Choreographer",
    "Kishore Nayak Official Website",
    "Fashion Choreographer India",
    "Creative Director Portfolio",
    "Fashion Show Director"
  ],
  authors: [{ name: "Kishore Nayak", url: "https://kishorenayak.in.net" }],
  creator: "Kishore Nayak",
  publisher: "Kishore Nayak",
  alternates: {
    canonical: "https://kishorenayak.in.net",
  },
  openGraph: {
    title: "Kishore Nayak | Creative Director & Fashion Choreographer",
    description: "Official website of Kishore Nayak — Creative Director, Fashion Choreographer, and Performance Coach.",
    url: "https://kishorenayak.in.net",
    siteName: "Kishore Nayak",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/hero-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Kishore Nayak Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kishore Nayak | Creative Director & Fashion Choreographer",
    description: "Official website of Kishore Nayak — Creative Director & Fashion Choreographer.",
    images: ["/hero-image.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kishore Nayak",
    "url": "https://kishorenayak.in.net",
    "image": "https://kishorenayak.in.net/hero-image.jpeg",
    "jobTitle": "Creative Director & Fashion Choreographer",
    "description": "Multidisciplinary creative professional specializing in choreography, fashion performance training, and creative show direction.",
    "sameAs": [
      "https://kishorenayak.in.net"
    ]
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-white selection:bg-gold/30 selection:text-gold flex flex-col min-h-screen">
        <SmoothScrolling>
          {children}
        </SmoothScrolling>

        {/* Global Floating Developer Badge */}
        <a 
          href="https://www.fuera.in.net/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-800 text-[10px] md:text-xs font-sans tracking-widest text-zinc-400 uppercase hover:text-white hover:border-zinc-600 transition-all duration-300 shadow-xl"
        >
          design build by <span className="text-white font-bold">FUERA</span>
        </a>
      </body>
    </html>
  );
}
