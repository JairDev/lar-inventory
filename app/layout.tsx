import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: {
    template: "%s | Lar Market",
    default: "Lar Market",
  },
  icons: {
    icon: "/icon.png",
  },
  description: "Sistema de inventario.",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/icon.png" sizes="any" />
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
