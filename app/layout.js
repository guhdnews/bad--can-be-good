// app/layout.js - Root layout for App Router
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../contexts/ThemeContext'
import { AuthProvider } from '../contexts/AuthContext'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata = {
  metadataBase: new URL('https://badcanbegood.com'),
  title: {
    template: '%s | News Can Be Good',
    default: 'News Can Be Good - Spreading Positivity Through Journalism'
  },
  description: 'Discover uplifting news stories that restore faith in humanity. Get your daily dose of positive journalism from around the world.',
  keywords: 'positive news, good news, uplifting stories, inspiring journalism, hope, community',
  authors: [{ name: 'News Can Be Good Team' }],
  creator: 'News Can Be Good',
  publisher: 'News Can Be Good',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://badcanbegood.com',
    title: 'News Can Be Good - Positive News That Matters',
    description: 'Daily positive news stories that inspire and uplift. Join our community spreading hope through journalism.',
    siteName: 'News Can Be Good',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'News Can Be Good - Positive Journalism',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News Can Be Good - Positive News That Matters',
    description: 'Daily positive news stories that inspire and uplift. Join our community spreading hope through journalism.',
    creator: '@newscanbegood',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://badcanbegood.com" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FFCC02" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col">
              {children}
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}