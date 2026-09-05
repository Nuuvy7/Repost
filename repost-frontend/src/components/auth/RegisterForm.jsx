import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import gsap from 'gsap'
import ImageSlider from './ImageSlider'
import regImg1 from '@/assets/iqro-rinaldi-_hlDpQwfQnY-unsplash.jpg'
import regImg2 from '@/assets/nanang-adi-U6U5OCxZ5cM-unsplash.jpg'
import regImg3 from '@/assets/bridget-adolfo-8AvKx80-FOw-unsplash.jpg'
import regImg4 from '@/assets/fikri-rasyid-IBb_Y65z5ZU-unsplash.jpg'
import regImg5 from '@/assets/jonathan-ford-6ZgTEtvD16I-unsplash.jpg'

const registerImages = [regImg1, regImg2, regImg3, regImg4, regImg5]

export default function RegisterForm() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  // Refs
  const pageRef = useRef(null)
  const blobRef = useRef(null)
  const cardRef = useRef(null)
  const titleRef = useRef(null)
  const sliderRef = useRef(null)
  const field1Ref = useRef(null)
  const field2Ref = useRef(null)
  const field3Ref = useRef(null)
  const field4Ref = useRef(null)
  const footerRef = useRef(null)
  const btnRef = useRef(null)
  const dotsRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Blob breathing + slow rotation
      gsap.to(blobRef.current, {
        scale: 1.06,
        rotation: 360,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Main entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Card entrance
      tl.from(cardRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        ease: 'power2.out',
      })

      // Image slider entrance
      tl.from(sliderRef.current, {
        x: -40,
        opacity: 0,
        duration: 0.7,
      }, '-=0.6')

      // Title reveal
      tl.from(titleRef.current, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 0.7,
        ease: 'power4.out',
      }, '-=0.5')

      // Field 1 (Username)
      tl.from(field1Ref.current, {
        y: 24,
        opacity: 0,
        duration: 0.5,
      }, '-=0.3')

      // Field 2 (Email)
      tl.from(field2Ref.current, {
        y: 24,
        opacity: 0,
        duration: 0.5,
      }, '-=0.35')

      // Field 3 (Password)
      tl.from(field3Ref.current, {
        y: 24,
        opacity: 0,
        duration: 0.5,
      }, '-=0.35')

      // Field 4 (Confirm Password)
      tl.from(field4Ref.current, {
        y: 24,
        opacity: 0,
        duration: 0.5,
      }, '-=0.35')

      // Footer (Login link + button)
      tl.from(footerRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
      }, '-=0.2')

      // Button bounce (only scale, no opacity — parent footerRef handles opacity)
      tl.from(btnRef.current, {
        scale: 0.7,
        duration: 0.5,
        ease: 'back.out(2)',
      }, '-=0.3')

      // Pagination dots
      tl.from(dotsRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
      }, '-=0.8')

      // Logo
      tl.from(logoRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.4,
        ease: 'back.out(1.5)',
      }, '-=0.5')
    }, pageRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await register(form)
      navigate('/home')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div ref={pageRef} className="min-h-screen relative overflow-hidden bg-[#f9f9f9] flex items-center justify-center">
      {/* Decorative Background Blob - HALF CIRCLE AT TOP (Yellow/Orange) */}
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
            background: 'linear-gradient(135deg, #ffe45e 0%, #f5a623 40%, #e8913a 100%)',
            opacity: 0.8,
            boxShadow: '0 0 120px 40px rgba(255, 228, 94, 0.4), 0 0 200px 80px rgba(245, 166, 35, 0.25)',
            filter: 'blur(60px)',
          }}
        />
        {/* Grain overlay */}
        <svg className="absolute inset-0 w-full h-full" style={{ mixBlendMode: 'overlay' }}>
          <filter id="grainRegister">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grainRegister)" opacity="0.07" />
        </svg>
      </div>

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-[880px] mx-4">
        <div
          ref={cardRef}
          className="rounded-[24px] overflow-hidden flex min-h-[480px]"
          style={{
            background: 'rgba(255, 255, 255, 0.55)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Left Side - Image Slider */}
          <div ref={sliderRef} className="relative w-[40%] hidden md:block" style={{ borderRadius: '24px 0 0 24px', overflow: 'hidden' }}>
            <ImageSlider images={registerImages} interval={3000} fadeDuration={800} dotsRef={dotsRef} logoRef={logoRef} />
          </div>

          {/* Right Side - Form */}
          <div
            className="flex-1 flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,228,94,0.18) 0%, rgba(245,166,35,0.10) 25%, rgba(255,255,255,0.85) 55%, #ffffff 100%)',
            }}
          >
            {/* Title */}
            <h1 ref={titleRef} className="font-serif text-[32px] sm:text-[40px] md:text-[48px] leading-tight text-white mb-8">
              Buat Akun
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-[8px] font-sans">
                  {error}
                </div>
              )}

              {/* Username */}
              <div ref={field1Ref} className="space-y-2">
                <label className="text-[15px] font-medium text-repost-text font-sans block">
                  Username
                </label>
                <Input
                  placeholder="Masukkan Username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="h-[56px] rounded-[8px] text-[15px] bg-white"
                  required
                />
              </div>

              {/* Email */}
              <div ref={field2Ref} className="space-y-2">
                <label className="text-[15px] font-medium text-repost-text font-sans block">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Masukkan Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-[56px] rounded-[8px] text-[15px] bg-white"
                  required
                />
              </div>

              {/* Password */}
              <div ref={field3Ref} className="space-y-2">
                <label className="text-[15px] font-medium text-repost-text font-sans block">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Masukkan Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="h-[56px] rounded-[8px] text-[15px] bg-white"
                  required
                />
              </div>

              {/* Konfirmasi Password */}
              <div ref={field4Ref} className="space-y-2">
                <label className="text-[15px] font-medium text-repost-text font-sans block">
                  Konfirmasi Password
                </label>
                <Input
                  type="password"
                  placeholder="Konfirmasi Password"
                  value={form.password_confirmation}
                  onChange={(e) =>
                    setForm({ ...form, password_confirmation: e.target.value })
                  }
                  className="h-[56px] rounded-[8px] text-[15px] bg-white"
                  required
                />
              </div>

              <div ref={footerRef} className="pt-2">
                <p className="text-[15px] text-repost-text font-sans mb-6">
                  Sudah Punya Akun?{' '}
                  <Link
                    to="/login"
                    className="text-repost-yellow font-medium hover:underline underline-offset-4"
                  >
                    Login
                  </Link>
                </p>

                <div className="flex justify-center">
                  <Button
                    ref={btnRef}
                    type="submit"
                    className="w-full max-w-[220px] h-[60px] rounded-full text-[18px] font-heading font-medium shadow-md hover:shadow-xl hover:scale-105 hover:bg-[#6bb8e0] transition-all duration-300 ease-out cursor-pointer"
                    style={{ backgroundColor: '#7FC8F8', color: '#ffffff' }}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : null}
                    Register
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
