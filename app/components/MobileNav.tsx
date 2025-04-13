'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900"
        aria-label="Menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/sobre"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Sobre
              </Link>
              <Link
                href="/areas-atuacao"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Áreas de Atuação
              </Link>
              <Link
                href="/contato"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Contato
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
} 