import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  image: string
  slug: string
  category: string
}

export default function BlogCard({ title, excerpt, date, image, slug, category }: BlogCardProps) {
  return (
    <article className="card group">
      <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[#CFAB5F] text-white text-sm rounded-full">
            {category}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {date}
        </div>
        <h3 className="text-xl font-semibold group-hover:text-[#CFAB5F] transition-colors">
          <Link href={`/blog/${slug}`}>
            {title}
          </Link>
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {excerpt}
        </p>
        <Link 
          href={`/blog/${slug}`}
          className="inline-flex items-center text-[#CFAB5F] hover:text-[#B89754] transition-colors"
        >
          Ler mais
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  )
} 