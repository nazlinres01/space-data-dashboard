import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'space data dashboard',
  description: 'space data dashboard',
  generator: 'space data dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
