import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ASTU SGPA Calculator",
  description: "Calculate Your Semester GPA in Seconds. Made for ASTU students.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
