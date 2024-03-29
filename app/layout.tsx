/* eslint-disable @next/next/no-page-custom-font */
import Script from "next/script";
import "./globals.css";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400;800&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        className="bg-warning"
        style={{ fontFamily: "Maven Pro sans-serif" }}
      >
        {children}
      </body>
      <Script src="	https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" />
    </html>
  );
}
