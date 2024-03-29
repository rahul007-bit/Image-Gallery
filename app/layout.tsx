import type { Metadata } from "next";
import { Montserrat, Pattaya } from "next/font/google";
import "./globals.css";
import SearchBar from "@/components/searchbar";
import Toggle from "@/components/toggle";

const pattaya = Pattaya({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"], weight: "700" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" id="rk">
      <head>
        <title>Image gallery</title>
      </head>
      <body className="dark:bg-[#232323]">
        <header className="header">
          <nav className="nav-grid">
            <a href="/" className={`nav-logo ${pattaya.className}`}>
              Image gallery
            </a>
            {/* search bar */}
            <SearchBar placeholder="Search high resolution Images" />
            <div
              className={`hidden md:flex xl:gap-10 lg:gap-7 md:gap-6 col-span-2 items-center ${montserrat.className} text-[#333] dark:text-white lg:text-sm text-xs ml-2`}
            >
              <p>Explore</p>
              <p>Collection</p>
              <p>Community</p>
            </div>
            {/* toggle */}
            <Toggle />
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
