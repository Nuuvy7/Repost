import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Home, User, HelpCircle, PenSquare, ChevronLeft, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import logoMark from '@/assets/repost-logo-mark.svg'

const navItems = [
  { icon: Home, label: 'Home', path: '/home' },
]

const bottomItems = [
  { icon: HelpCircle, label: 'Help', path: '/help' },
]

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/home') return location.pathname === '/home' || location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn(
        'flex items-center h-[80px] px-5 shrink-0',
        collapsed ? 'justify-center' : ''
      )}>
        {!collapsed ? (
          <Link to="/" className="flex items-center gap-2.5" onClick={onMobileClose}>
            <img src={logoMark} alt="REPOST" className="w-7 h-7" />
            <span className="font-serif text-[18px] font-normal text-repost-text tracking-wide">
              REPOST
            </span>
          </Link>
        ) : (
          <Link to="/" className="w-9 h-9 flex items-center justify-center" onClick={onMobileClose}>
            <img src={logoMark} alt="REPOST" className="w-7 h-7" />
          </Link>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4">
        <div className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onMobileClose}
                className={cn(
                  'flex items-center gap-3 rounded-[10px] px-4 py-2.5 text-[14px] font-medium transition-all',
                  collapsed ? 'justify-center px-2.5' : '',
                  active
                    ? 'bg-[#005139] text-white'
                    : 'text-repost-text hover:bg-[#ebefea]'
                )}
              >
                <Icon className="w-[18px] h-[18px] shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="px-3 pb-5 space-y-1.5">
        {bottomItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onMobileClose}
              className={cn(
                'flex items-center gap-3 rounded-[10px] px-4 py-2.5 text-[14px] font-medium text-repost-text hover:bg-[#ebefea] transition-all w-full',
                collapsed ? 'justify-center px-2.5' : ''
              )}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}

        {/* Post Button */}
        <Link
          to="/create"
          onClick={onMobileClose}
          className={cn(
            'flex items-center gap-3 rounded-[10px] px-4 py-2.5 text-[14px] font-medium text-repost-text hover:bg-[#ebefea] transition-all w-full',
            collapsed ? 'justify-center px-2.5' : ''
          )}
        >
          <PenSquare className="w-[18px] h-[18px] shrink-0" />
          {!collapsed && <span>Post</span>}
        </Link>

        {/* Collapse Toggle - only on desktop */}
        <button
          onClick={onToggle}
          className={cn(
            'hidden lg:flex items-center gap-3 rounded-[10px] px-4 py-2.5 text-[14px] font-medium text-repost-text hover:bg-[#ebefea] transition-all w-full',
            collapsed ? 'justify-center px-2.5' : ''
          )}
        >
          <ChevronLeft className={cn(
            'w-[18px] h-[18px] shrink-0 transition-transform',
            collapsed ? 'rotate-180' : ''
          )} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-100 transition-all duration-300 hidden lg:block',
          collapsed ? 'w-[64px]' : 'w-[220px]'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={onMobileClose}
          />
          <aside className="fixed left-0 top-0 z-50 h-screen w-[220px] bg-white lg:hidden">
            <button
              onClick={onMobileClose}
              className="absolute top-3 right-3 p-3 text-repost-text/60 hover:text-repost-text"
            >
              <X className="w-4 h-4" />
            </button>
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  )
}
