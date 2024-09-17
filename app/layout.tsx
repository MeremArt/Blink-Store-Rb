import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/store/provider";
import AppWalletProvider from "./components/AppWalletProvider";
import { ToastContainer } from "react-toastify";
export const metadata: Metadata = {
  title: "Ribh Store",
  description: "A Better way to collect local payment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={""}>
        <ReduxProvider>
          <AppWalletProvider>
            {children}
            <ToastContainer />
          </AppWalletProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
