import { Inter } from 'next/font/google'
import './css/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Opal Cloud',
  description: 'Your next gen VPS monitoring app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
