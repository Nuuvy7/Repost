import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function LavaLampBackground() {
  const containerRef = useRef(null)
  const blobsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      blobsRef.current.forEach((blob, i) => {
        if (!blob) return

        const duration = 12 + i * 3

        // Morphing movement
        gsap.to(blob, {
          x: `random(-60, 60)`,
          y: `random(-40, 40)`,
          duration: duration,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 2,
        })

        // Scale breathing
        gsap.to(blob, {
          scale: `random(0.9, 1.1)`,
          duration: duration + 4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 1.5,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Green Blob */}
      <div
        ref={(el) => (blobsRef.current[0] = el)}
        className="blob absolute"
        style={{
          width: '320px',
          height: '320px',
          top: '5%',
          left: '5%',
          background: 'linear-gradient(120deg, #005139 0%, #89f87f 100%)',
          borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
          animation: 'morphGreen 8s ease-in-out infinite',
          opacity: 0.8,
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: 'inherit',
            background: 'linear-gradient(120deg, rgba(0,81,57,0.4) 0%, rgba(137,248,127,0.6) 100%)',
            animation: 'morphGreen 6s ease-in-out infinite reverse',
            opacity: 0.6,
            boxShadow: '0 0 80px rgba(0,81,57,0.3)',
          }}
        />
      </div>

      {/* Orange Blob */}
      <div
        ref={(el) => (blobsRef.current[1] = el)}
        className="blob absolute"
        style={{
          width: '280px',
          height: '280px',
          top: '35%',
          right: '3%',
          background: 'linear-gradient(120deg, #FF6B35 0%, #ffe45e 100%)',
          borderRadius: '70% 30% 46% 54% / 30% 29% 71% 70%',
          animation: 'morphOrange 10s ease-in-out infinite',
          opacity: 0.75,
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: 'inherit',
            background: 'linear-gradient(120deg, rgba(255,107,53,0.4) 0%, rgba(255,228,94,0.6) 100%)',
            animation: 'morphOrange 7s ease-in-out infinite reverse',
            opacity: 0.6,
            boxShadow: '0 0 80px rgba(255,107,53,0.3)',
          }}
        />
      </div>

      {/* Blue Blob */}
      <div
        ref={(el) => (blobsRef.current[2] = el)}
        className="blob absolute"
        style={{
          width: '300px',
          height: '300px',
          bottom: '8%',
          left: '25%',
          background: 'linear-gradient(120deg, #5aa9e6 0%, #7FC8F8 100%)',
          borderRadius: '100% 60% 60% 100% / 100% 100% 60% 60%',
          animation: 'morphBlue 9s ease-in-out infinite',
          opacity: 0.8,
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: 'inherit',
            background: 'linear-gradient(120deg, rgba(90,169,230,0.4) 0%, rgba(127,200,248,0.6) 100%)',
            animation: 'morphBlue 6.5s ease-in-out infinite reverse',
            opacity: 0.6,
            boxShadow: '0 0 80px rgba(90,169,230,0.3)',
          }}
        />
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes morphGreen {
          0%, 100% {
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
            transform: translate3d(0, 0, 0) rotateZ(0deg);
          }
          34% {
            border-radius: 70% 30% 46% 54% / 30% 29% 71% 70%;
            transform: translate3d(0, 8px, 0) rotateZ(2deg);
          }
          67% {
            border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%;
            transform: translate3d(0, -5px, 0) rotateZ(-2deg);
          }
        }

        @keyframes morphOrange {
          0%, 100% {
            border-radius: 70% 30% 46% 54% / 30% 29% 71% 70%;
            transform: translate3d(0, 0, 0) rotateZ(0deg);
          }
          34% {
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
            transform: translate3d(0, -6px, 0) rotateZ(-3deg);
          }
          67% {
            border-radius: 58% 42% 30% 70% / 55% 45% 55% 45%;
            transform: translate3d(0, 4px, 0) rotateZ(3deg);
          }
        }

        @keyframes morphBlue {
          0%, 100% {
            border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%;
            transform: translate3d(0, 0, 0) rotateZ(0deg);
          }
          34% {
            border-radius: 58% 42% 30% 70% / 55% 45% 55% 45%;
            transform: translate3d(0, 5px, 0) rotateZ(2deg);
          }
          67% {
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
            transform: translate3d(0, -7px, 0) rotateZ(-2deg);
          }
        }
      `}</style>
    </div>
  )
}
