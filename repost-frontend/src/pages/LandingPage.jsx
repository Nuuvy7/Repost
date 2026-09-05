import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
              <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="#89f87f" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <a href="#" className="text-white/80 hover:text-white font-sans text-lg transition-colors">
            home
          </a>
          <a href="#" className="text-white/80 hover:text-white font-sans text-lg transition-colors">
            about
          </a>
          <a href="#" className="text-white/80 hover:text-white font-sans text-lg transition-colors">
            contact
          </a>
          {user ? (
            <Link to="/">
              <Button className="bg-white text-repost-green hover:bg-white/90 rounded-pill px-6 font-heading">
                Dashboard
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10 rounded-pill px-6 font-heading">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-white text-repost-green hover:bg-white/90 rounded-pill px-6 font-heading">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo Mark */}
          <div className="flex justify-center mb-8">
            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
                <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="#89f87f" />
              </svg>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-[120px] md:text-[160px] lg:text-[180px] text-[#f0eded] leading-none tracking-tight mb-6">
            REPOST
          </h1>

          {/* Tagline */}
          <p className="text-[#f0eded]/80 font-sans text-2xl md:text-3xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Report dan Post kerusakan infrastruktur di jakarta
          </p>

          {/* CTA Button */}
          <Link to={user ? '/' : '/register'}>
            <Button className="bg-repost-blue text-white hover:bg-repost-blue/90 rounded-pill px-10 py-4 text-xl font-heading font-medium shadow-lg hover:shadow-xl transition-all">
              MULAI LAPOR
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-12 py-6 text-center">
        <p className="text-repost-text/30 font-sans text-sm">
          &copy; 2026 REPOST. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
