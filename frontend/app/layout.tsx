import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import NextAuthProvider from '@/app/_next_auth_provider';
import {ReactNode} from 'react';
import {Toaster} from '@/components/ui/toaster';
import {SheetProvider} from '@/contexts/sheet-context';
import ThemeProvider from '@/components/layout/theme-provider';

const inter = Inter({subsets: ["latin"]});


export const metadata: Metadata = {
    icons: [
        {
            rel: 'apple-touch-icon',
            url: '/apple-touch-icon.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            url: '/favicon-32x32.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            url: '/favicon-16x16.png',
        },
        {
            rel: 'icon',
            url: '/favicon.ico',
        },
    ],
};

export default function RootLayout({children}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <NextAuthProvider>
                <SheetProvider>
                    {children}
                </SheetProvider>
            </NextAuthProvider>
            <Toaster/>
        </ThemeProvider>
        </body>
        </html>
    );
}
