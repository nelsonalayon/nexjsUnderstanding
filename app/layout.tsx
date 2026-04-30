import "@/app/ui/global.css"
import { Metadata } from "next";
import { inter } from '@/app/ui/fonts';


export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "A dashboard built with Next.js 13 and Tailwind CSS",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
