import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Lar Market",
    default: "Lar Market",
  },
  icons: {
    icon: "/icon.png",
  },
  description: "Sistema de inventario.",
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
