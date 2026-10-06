import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Lora } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/config/brand";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/JsonLd";
import { NetworkProvider } from "@/components/live/NetworkProvider";
import { WalletModalProvider } from "@/components/wallet/WalletButton";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import { OG_IMAGE, organizationLd, websiteLd } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
const lora = Lora({ subsets: ["latin"], weight: ["400"], variable: "--font-lora", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

const title = "Cross-Border Payments on Robinhood Chain — Gleo";

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: { default: title, template: `%s — ${BRAND.name}` },
  description: BRAND.description,
  applicationName: BRAND.name,
  openGraph: { type: "website", url: BRAND.url, siteName: BRAND.name, title, description: BRAND.description, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", site: BRAND.xHandle, title, description: BRAND.description, images: [OG_IMAGE.url] },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} ${plexMono.variable}`}>
      <body className="min-h-dvh overflow-x-hidden font-sans antialiased">
        <JsonLd data={[organizationLd, websiteLd]} />
        <WalletProvider>
          <WalletModalProvider>
            <NetworkProvider>
              <Header />
              <main className="min-h-[70vh] pt-[var(--header-h)]">{children}</main>
              <Footer />
            </NetworkProvider>
          </WalletModalProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
