import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import gsap from 'gsap'
import ImageSlider from './ImageSlider'
import loginImg1 from '@/assets/nanang-adi-U6U5OCxZ5cM-unsplash.jpg'
import loginImg2 from '@/assets/iqro-rinaldi-_hlDpQwfQnY-unsplash.jpg'
import loginImg3 from '@/assets/bridget-adolfo-8AvKx80-FOw-unsplash.jpg'
import loginImg4 from '@/assets/fikri-rasyid-IBb_Y65z5ZU-unsplash.jpg'
import loginImg5 from '@/assets/jonathan-ford-6ZgTEtvD16I-unsplash.jpg'

const loginImages = [loginImg1, loginImg2, loginImg3, loginImg4, loginImg5]

export default function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '' })

  // Refs
  const pageRef = useRef(null)
  const blobRef = useRef(null)
  const cardRef = useRef(null)
  const titleRef = useRef(null)
  const sliderRef = useRef(null)
  const field1Ref = useRef(null)
  const field2Ref = useRef(null)
  const forgotRef = useRef(null)
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

      // Card entrance — slide up + fade
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

      // Title reveal — clip path kiri ke kanan
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

      // Field 2 (Password)
      tl.from(field2Ref.current, {
        y: 24,
        opacity: 0,
        duration: 0.5,
      }, '-=0.35')

      // Forgot Password
      tl.from(forgotRef.current, {
        opacity: 0,
        duration: 0.4,
      }, '-=0.25')

      // Footer (Register link + button)
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
      await login(form.email, form.password)
      navigate('/home')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div ref={pageRef} className="min-h-screen relative overflow-hidden bg-[#f9f9f9] flex items-center justify-center">
      {/* Decorative Background Blob - HALF CIRCLE AT TOP */}
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
            background: 'linear-gradient(135deg, #7FC8F8 0%, #89F87F 40%, #5aa9e6 100%)',
            opacity: 0.8,
            boxShadow: '0 0 120px 40px rgba(127, 200, 248, 0.4), 0 0 200px 80px rgba(137, 248, 127, 0.25)',
            filter: 'blur(60px)',
          }}
        />
        {/* Grain overlay */}
        <svg className="absolute inset-0 w-full h-full" style={{ mixBlendMode: 'overlay' }}>
          <filter id="grainLogin">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grainLogin)" opacity="0.07" />
        </svg>
      </div>

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-[880px] mx-4">
        <div
          ref={cardRef}
          className="rounded-[24px] overflow-hidden flex min-h-[520px]"
          style={{
            background: 'rgba(255, 255, 255, 0.55)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Left Side - Image Slider */}
          <div ref={sliderRef} className="relative w-[40%] hidden md:block" style={{ borderRadius: '24px 0 0 24px', overflow: 'hidden' }}>
            <ImageSlider images={loginImages} interval={3000} fadeDuration={800} dotsRef={dotsRef} logoRef={logoRef} />
          </div>

          {/* Right Side - Form */}
          <div
            className="flex-1 flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12"
            style={{
              background:
                'linear-gradient(180deg, rgba(137,248,127,0.18) 0%, rgba(127,200,248,0.10) 25%, rgba(255,255,255,0.85) 55%, #ffffff 100%)',
            }}
          >
            {/* Title */}
            <h1 ref={titleRef} className="font-serif text-[32px] sm:text-[40px] md:text-[48px] leading-tight text-white mb-10">
              Masukan Akun
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-[8px] font-sans">
                  {error}
                </div>
              )}

              <div ref={field1Ref} className="space-y-2">
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

              <div ref={field2Ref} className="space-y-2">
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

              <div ref={forgotRef} className="pt-1">
                <Link
                  to="/forgot-password"
                  className="text-[15px] text-repost-text font-sans underline underline-offset-4 decoration-1 hover:text-repost-green hover:bg-repost-green/10 rounded px-2 py-1 transition-all"
                >
                  Forgot Password?
                </Link>
              </div>

              <div ref={footerRef} className="pt-6">
                <p className="text-[15px] text-repost-text font-sans mb-6">
                  Belum Punya Akun?{' '}
                  <Link
                    to="/register"
                    className="text-repost-yellow font-medium hover:underline underline-offset-4"
                  >
                    Register
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
                    Login
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
