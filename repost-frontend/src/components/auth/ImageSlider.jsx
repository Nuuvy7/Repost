import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import logoMark from '@/assets/repost-logo-mark.svg'

export default function ImageSlider({ images, interval = 3000, fadeDuration = 800, dotsRef, logoRef }) {
  const [current, setCurrent] = useState(0)
  const containerRef = useRef(null)
  const imgRefs = useRef([])

  useEffect(() => {
    // Subtle parallax — each image slowly drifts up/down while active
    const tl = gsap.timeline({ repeat: -1 })
    images.forEach((_, i) => {
      tl.to(imgRefs.current[i], {
        y: -8,
        duration: interval / 1000,
        ease: 'none',
      })
    })

    return () => tl.kill()
  }, [images.length, interval])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, interval)
    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {images.map((src, i) => (
        <img
          key={i}
          ref={(el) => (imgRefs.current[i] = el)}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: i === current ? 1 : 0,
            transition: `opacity ${fadeDuration}ms ease-in-out`,
          }}
        />
      ))}

      {/* Pagination Dots */}
      <div ref={dotsRef} className="absolute top-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === current ? '52px' : '36px',
              height: '4px',
              backgroundColor: i === current ? 'white' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>

      {/* Logo at bottom-right */}
      <div ref={logoRef} className="absolute bottom-4 right-4 z-10">
        <img src={logoMark} alt="REPOST" className="w-10 h-10 drop-shadow-lg" />
      </div>
    </div>
  )
}
