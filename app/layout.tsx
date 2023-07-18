import './globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'


export const metadata = {
  title: 'Exotic Cars',
  description: 'Discover the home of world best cars',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative'>
        <Navbar />
           {children}
        <Footer />
      </body>
    </html>
  )
}
