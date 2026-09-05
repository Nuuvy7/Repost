import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { authApi } from '@/api/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import gsap from 'gsap'

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [email, setEmail] = useState('')

  const pageRef = useRef(null)
  const blobRef = useRef(null)
  const cardRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const fieldRef = useRef(null)
  const btnRef = useRef(null)
  const linkRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(blobRef.current, {
        scale: 1.06,
        rotation: 360,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(cardRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        ease: 'power2.out',
      })

      tl.from(titleRef.current, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 0.7,
        ease: 'power4.out',
      }, '-=0.5')

      tl.from(subtitleRef.current, {
        y: 10,
        opacity: 0,
        duration: 0.5,
      }, '-=0.3')

      tl.from(fieldRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.5,
      }, '-=0.2')

      tl.from(btnRef.current, {
        scale: 0.7,
        duration: 0.5,
        ease: 'back.out(2)',
      }, '-=0.2')

      tl.from(linkRef.current, {
        opacity: 0,
        duration: 0.4,
      }, '-=0.2')
    }, pageRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const res = await authApi.forgotPassword(email)
      setSuccess(res.data.message)
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengirim link reset')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div ref={pageRef} className="min-h-screen relative overflow-hidden bg-[#f9f9f9] flex items-center justify-center">
      {/* Decorative Background Blob - BLUE HALF CIRCLE AT TOP */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          ref={blobRef}
          className="absolute"
          style={{
            top: '-380px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '1200px',
            height: '1200px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #5aa9e6 0%, #7FC8F8 40%, #4a90d9 100%)',
            opacity: 0.8,
            boxShadow: '0 0 120px 40px rgba(90, 169, 230, 0.4), 0 0 200px 80px rgba(127, 200, 248, 0.25)',
            filter: 'blur(60px)',
          }}
        />
        <svg className="absolute inset-0 w-full h-full" style={{ mixBlendMode: 'overlay' }}>
          <filter id="grainForgot">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grainForgot)" opacity="0.07" />
        </svg>
      </div>

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-[520px] mx-4">
        <div
          ref={cardRef}
          className="rounded-[24px] overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.55)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div
            className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-14"
            style={{
              background:
                'linear-gradient(180deg, rgba(90,169,230,0.15) 0%, rgba(127,200,248,0.08) 25%, rgba(255,255,255,0.9) 55%, #ffffff 100%)',
            }}
          >
            <h1 ref={titleRef} className="font-serif text-[28px] sm:text-[36px] md:text-[42px] leading-tight text-white mb-3">
              Lupa Password?
            </h1>
            <p ref={subtitleRef} className="text-[15px] text-repost-text/80 font-sans mb-10">
              Masukkan email anda dan kami akan mengirimkan link untuk reset password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-[8px] font-sans">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 text-sm text-green-600 bg-green-50 rounded-[8px] font-sans">
                  {success}
                </div>
              )}

              <div ref={fieldRef} className="space-y-2">
                <label className="text-[15px] font-medium text-repost-text font-sans block">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Masukkan email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-[56px] rounded-[8px] text-[15px] bg-white"
                  required
                />
              </div>

              <div className="pt-4 flex justify-center">
                <Button
                  ref={btnRef}
                  type="submit"
                  className="w-full max-w-[220px] h-[60px] rounded-full text-[18px] font-heading font-medium shadow-md hover:shadow-xl hover:scale-105 hover:bg-[#6bb8e0] transition-all duration-300 ease-out cursor-pointer"
                  style={{ backgroundColor: '#7FC8F8', color: '#ffffff' }}
                  disabled={loading}
                >
                  {loading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : null}
                  Kirim Link Reset
                </Button>
              </div>
            </form>

            <div ref={linkRef} className="mt-8 text-center">
              <Link
                to="/login"
                className="text-[15px] text-repost-text font-sans underline underline-offset-4 decoration-1 hover:text-repost-green hover:bg-repost-green/10 rounded px-2 py-1 transition-all"
              >
                Kembali ke Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
