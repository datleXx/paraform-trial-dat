import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/home/header";
import ClientWrapper from "./_components/utils/ClientWrapper";
import { NextUIProvider } from "@nextui-org/react";

export const metadata: Metadata = {
  title: "ATS",
  description: "Xuan Dat Le",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <NextUIProvider>
          <ClientWrapper>
            <Header />
            <TRPCReactProvider>
              <main className="mt-[65px]">{children}</main>
            </TRPCReactProvider>
          </ClientWrapper>
        </NextUIProvider>
      </body>
    </html>
  );
}
