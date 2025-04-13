'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-in' | 'slide-in-left' | 'slide-in-right'
  delay?: number
  threshold?: number
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay, threshold])

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0'

    switch (animation) {
      case 'fade-up':
        return 'animate-fade-up'
      case 'fade-in':
        return 'animate-fade-in'
      case 'slide-in-left':
        return 'animate-slide-in-left'
      case 'slide-in-right':
        return 'animate-slide-in-right'
      default:
        return 'animate-fade-up'
    }
  }

  return (
    <div
      ref={ref}
      className={`${className} ${getAnimationClass()} transition-all duration-700`}
    >
      {children}
    </div>
  )
} 