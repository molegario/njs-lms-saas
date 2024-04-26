import './globals.css'
import type { Metadata } from 'next'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ToasterProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'

const inter = Inter({ subsets: ['latin'] })

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export const metadata: Metadata = {
  title: "Learn'd to Teach",
  description: 'A site where students become masters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConfettiProvider />
            <ToasterProvider />
            {children}
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
