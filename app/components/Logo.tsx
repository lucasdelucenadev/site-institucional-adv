'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="relative w-10 h-10">
        <Image
          src="https://placehold.co/40x40/CFAB5F/FFFFFF?text=LL"
          alt="Logo Lucas de Lucena"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-[#CFAB5F]">Lucas de Lucena</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">Advocacia Criminal</span>
      </div>
    </Link>
  )
} 