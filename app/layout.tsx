import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import WhatsAppButton from './components/WhatsAppButton'
import Newsletter from './components/Newsletter'
import Testimonials from './components/Testimonials'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lucas de Lucena - Advogado",
  description: "Escritório de advocacia especializado em direito civil, trabalhista e previdenciário.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <Testimonials />
          <Newsletter />
          <Footer />
          <Chatbot />
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}
