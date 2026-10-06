import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/config/brand";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { NetworkProvider } from "@/components/live/NetworkProvider";
import { WalletModalProvider } from "@/components/wallet/WalletButton";
import { WalletProvider } from "@/components/wallet/WalletProvider";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-mono", display: "swap" });

const title = `${BRAND.name} (${BRAND.symbol}): ${BRAND.slogan}`;

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: { default: title, template: `%s · ${BRAND.name}` },
  description: BRAND.description,
  keywords: [BRAND.name, BRAND.symbol, "Robinhood Chain", "cross-border payments", "tokenization", "real-world assets", "DeFi", "USDG"],
  openGraph: { type: "website", url: BRAND.url, siteName: BRAND.name, title, description: BRAND.tagline },
  twitter: { card: "summary_large_image", site: BRAND.xHandle, title, description: BRAND.tagline },
};

export const viewport: Viewport = { themeColor: "#edf0ee" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${hanken.variable} ${plexMono.variable}`}>
      <body className="min-h-dvh overflow-x-hidden font-sans antialiased">
        <WalletProvider>
          <WalletModalProvider>
            <NetworkProvider>
              <Header />
              <main className="min-h-[70vh]">{children}</main>
              <Footer />
            </NetworkProvider>
          </WalletModalProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
