import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import NextTheme from "@/providers/next-theme";
import GlobalDrawer from "@/components/drawer/container";
import GlobalModal from "@/components/modal/container";

import AuthSession from "@/providers/next-auth";
import { getServerAuthSession } from "@/lib/auth";
import "./globals.css";
import Toast from "@/providers/toast";

const roboto = Roboto({
  subsets: ["cyrillic"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Caliber",
  description: "Caliber Template",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className} suppressHydrationWarning>
        <NextTheme attribute="class" defaultTheme="system" enableSystem>
          <AuthSession session={session}>
            <GlobalDrawer />
            <GlobalModal />
            <Toast />
            {children}
          </AuthSession>
        </NextTheme>
      </body>
    </html>
  );
}
