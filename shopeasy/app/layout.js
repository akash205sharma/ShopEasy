import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import { GlobalProvider } from "./GlobalProvider";
import { Toaster } from "@/components/ui/sonner"


export const metadata = {
  title: "ShopEasy",
  description: "Buy and sell Products",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          <SessionWrapper>
            <Navbar />
            {children}
          </SessionWrapper>
        </GlobalProvider>
        <Toaster/>
      </body>
    </html>
  );
}
