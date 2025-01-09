import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/heaader";
import { FavoritesProvider } from "@/components/providers/favorites-provider";

export const metadata: Metadata = {
  title: "Hilabs Giphy App",
  description: "Browse and search for GIFs using the Giphy API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FavoritesProvider>
            <Header />
            {children}
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
