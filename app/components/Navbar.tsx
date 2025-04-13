'use client'

import Link from 'next/link'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-[#CFAB5F]">Lucas de Lucena</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-[#CFAB5F] dark:hover:text-[#CFAB5F] px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/sobre" className="text-gray-700 dark:text-gray-300 hover:text-[#CFAB5F] dark:hover:text-[#CFAB5F] px-3 py-2 rounded-md text-sm font-medium">
              Sobre
            </Link>
            <Link href="/areas-atuacao" className="text-gray-700 dark:text-gray-300 hover:text-[#CFAB5F] dark:hover:text-[#CFAB5F] px-3 py-2 rounded-md text-sm font-medium">
              Áreas de Atuação
            </Link>
            <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-[#CFAB5F] dark:hover:text-[#CFAB5F] px-3 py-2 rounded-md text-sm font-medium">
              Blog
            </Link>
            <Link
              href="/contato"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Contato
            </Link>
            <Link
              href="/area-cliente"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Área do Cliente
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-[#CFAB5F] dark:hover:text-[#CFAB5F] focus:outline-none"
            >
              <span className="sr-only">Abrir menu principal</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-[#CFAB5F] dark:hover:text-[#CFAB5F] block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/sobre" className="text-gray-700 dark:text-gray-300 hover:text-[#CFAB5F] dark:hover:text-[#CFAB5F] block px-3 py-2 rounded-md text-base font-medium">
              Sobre
            </Link>
            <Link href="/areas-atuacao" className="text-gray-700 dark:text-gray-300 hover:text-[#CFAB5F] dark:hover:text-[#CFAB5F] block px-3 py-2 rounded-md text-base font-medium">
              Áreas de Atuação
            </Link>
            <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-[#CFAB5F] dark:hover:text-[#CFAB5F] block px-3 py-2 rounded-md text-base font-medium">
              Blog
            </Link>
            <Link
              href="/contato"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >
              Contato
            </Link>
            <Link
              href="/area-cliente"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >
              Área do Cliente
            </Link>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  )
} 