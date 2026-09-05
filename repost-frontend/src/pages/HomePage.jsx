import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PostFeed from '@/components/posts/PostFeed'
import RightSidebar, { MobileFlairFilter, MobilePeopleYouMayKnow, MobileNewsSection } from '@/components/layout/RightSidebar'
import LavaLampBackground from '@/components/effects/LavaLampBackground'
import { PenSquare } from 'lucide-react'
import gsap from 'gsap'

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const pageRef = useRef(null)
  const fabRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // FAB bounce in
      gsap.from(fabRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(2)',
        delay: 0.5,
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="relative flex gap-6 max-w-[1100px] mx-auto">
      <LavaLampBackground />

      {/* Main Feed */}
      <div className="flex-1 min-w-0 relative z-10">
        {/* Mobile Sections - Horizontal Scroll */}
        <div className="xl:hidden space-y-4 mb-4">
          <MobileFlairFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          <MobilePeopleYouMayKnow />
          <MobileNewsSection />
        </div>

        <PostFeed activeFilter={activeFilter} />
      </div>

      {/* Right Sidebar */}
      <div className="relative z-10 hidden xl:block">
        <RightSidebar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      {/* Floating Action Button - Mobile */}
      <Link
        ref={fabRef}
        to="/create"
        className="fixed bottom-5 right-5 xl:hidden bg-[#005139] text-white rounded-[14px] px-4 py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2.5 z-50"
      >
        <PenSquare className="w-4 h-4" />
        <span className="font-heading font-medium text-[13px]">BUAT POSTINGAN</span>
      </Link>
    </div>
  )
}
