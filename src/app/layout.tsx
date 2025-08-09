import '@/styles/globals.css'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Auramking — 3D Printing by Auramaking',
  description: 'Anime Figures, Decorations, Board Games — 3D printed in Morocco.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <div className="container flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.svg" alt="Auramking" width={160} height={40} />
            </Link>
            <nav className="flex flex-wrap gap-4 items-center">
              <Link href="/categories/anime-figures">Anime Figures</Link>
              <Link href="/categories/decorations">Decorations</Link>
              <Link href="/categories/board-games">Board Games</Link>
              <Link href="/cart" className="rounded-lg px-3 py-1 border">Cart</Link>
              <Link href="/admin" className="text-sm text-gray-500">Admin</Link>
            </nav>
          </div>
        </header>
        <main className="container py-6">{children}</main>
        <footer className="border-t mt-12">
          <div className="container py-6 text-sm text-gray-500 flex justify-between">
            <span>© {new Date().getFullYear()} Auramaking — All rights reserved.</span>
            <span>Made in Morocco • Currency: MAD</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
