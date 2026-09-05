import { useState, useEffect, useRef } from 'react'
import { Search, Bell, Menu, User, LogOut, Check, Loader2, Repeat2, Heart, MessageCircle, FileText } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { usersApi } from '@/api/users'
import { notificationsApi } from '@/api/notifications'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const notifIcons = {
  follow: User,
  repost: Repeat2,
  like: Heart,
  comment: MessageCircle,
  post_created: FileText,
}

const notifColors = {
  follow: 'text-[#5aa9e6]',
  repost: 'text-[#005139]',
  like: 'text-[#ba1a1a]',
  comment: 'text-[#EA580C]',
  post_created: 'text-[#7C3AED]',
}

const notifBgColors = {
  follow: 'bg-[#dbeafe]',
  repost: 'bg-[#e8f5e9]',
  like: 'bg-[#fee2e2]',
  comment: 'bg-[#fff7ed]',
  post_created: 'bg-[#f3e8ff]',
}

export default function Header({ onMenuToggle }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchPosts, setSearchPosts] = useState([])
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [notifications, setNotifications] = useState([])
  const [showNotifDropdown, setShowNotifDropdown] = useState(false)
  const [notifLoading, setNotifLoading] = useState(false)
  const searchRef = useRef(null)
  const debounceRef = useRef(null)
  const notifRef = useRef(null)
  const pollingRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false)
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Polling unread count every second
  useEffect(() => {
    if (!user) return

    const fetchUnread = async () => {
      try {
        const res = await notificationsApi.getUnreadCount()
        setUnreadCount(res.data.count)
      } catch (err) {
        // silent
      }
    }

    fetchUnread()
    pollingRef.current = setInterval(fetchUnread, 1000)
    return () => clearInterval(pollingRef.current)
  }, [user])

  const handleSearch = (value) => {
    setSearchQuery(value)

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    if (value.length < 2) {
      setSearchResults([])
      setSearchPosts([])
      setShowSearchDropdown(false)
      return
    }

    debounceRef.current = setTimeout(async () => {
      setSearchLoading(true)
      try {
        const res = await usersApi.search(value)
        setSearchResults(res.data.users || [])
        setSearchPosts(res.data.posts || [])
        setShowSearchDropdown(true)
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setSearchLoading(false)
      }
    }, 300)
  }

  const handleSelectUser = (userId) => {
    navigate(`/profile/${userId}`)
    setSearchQuery('')
    setSearchResults([])
    setSearchPosts([])
    setShowSearchDropdown(false)
  }

  const handleSelectPost = (postId) => {
    navigate(`/post/${postId}`)
    setSearchQuery('')
    setSearchResults([])
    setSearchPosts([])
    setShowSearchDropdown(false)
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleOpenNotifications = async () => {
    setShowNotifDropdown(true)
    setNotifLoading(true)
    try {
      const res = await notificationsApi.getAll({ per_page: 10 })
      setNotifications(res.data.notifications || [])
    } catch (err) {
      console.error('Error fetching notifications:', err)
    } finally {
      setNotifLoading(false)
    }
  }

  const handleNotifClick = async (notif) => {
    setShowNotifDropdown(false)
    try {
      await notificationsApi.markAsRead(notif.id)
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (err) {
      // silent
    }
    const data = notif.data
    if (data.type === 'follow') {
      navigate(`/profile/${data.follower_id}`)
    } else if (data.post_id) {
      navigate(`/post/${data.post_id}`)
    } else {
      navigate('/notifications')
    }
  }

  const handleMarkAllRead = async () => {
    try {
      await notificationsApi.markAllAsRead()
      setUnreadCount(0)
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read_at: new Date().toISOString() }))
      )
    } catch (err) {
      // silent
    }
  }

  return (
    <header className="sticky top-0 z-30 h-[60px] bg-[#f7faf5] flex items-center">
      <div className="flex-1 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3 flex-1">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-1.5 text-repost-text hover:bg-[#ebefea] rounded-[10px]"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Search Bar */}
          <div ref={searchRef} className="relative w-full max-w-[400px]">
            <div className="flex items-center bg-white rounded-full px-4 py-2.5 shadow-sm border border-gray-100">
              <Search className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
              <input
                type="text"
                placeholder="Search post or people"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => (searchResults.length > 0 || searchPosts.length > 0) && setShowSearchDropdown(true)}
                className="w-full bg-transparent outline-none text-[14px] font-sans text-repost-text placeholder:text-gray-400"
              />
              {searchLoading && (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-[#005139] rounded-full animate-spin" />
              )}
            </div>

            {/* Search Dropdown */}
            {showSearchDropdown && (searchResults.length > 0 || searchPosts.length > 0) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                <div className="max-h-[400px] overflow-y-auto">
                  {searchResults.length > 0 && (
                    <div>
                      <p className="px-4 pt-3 pb-1 text-[11px] font-semibold text-[#393030]/40 uppercase tracking-wider font-sans">Orang</p>
                      {searchResults.map((result) => (
                        <button
                          key={`user-${result.id}`}
                          onClick={() => handleSelectUser(result.id)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#f7faf5] transition-colors text-left"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={result.avatar} alt={result.name} />
                            <AvatarFallback className="bg-[#e8f0fe] text-[#5aa9e6] text-xs font-medium">
                              {result.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-medium text-[#393030] truncate">{result.name}</p>
                            {result.username && (
                              <p className="text-[11px] text-[#393030]/50 truncate">@{result.username}</p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {searchPosts.length > 0 && (
                    <div className={searchResults.length > 0 ? 'border-t border-gray-100' : ''}>
                      <p className="px-4 pt-3 pb-1 text-[11px] font-semibold text-[#393030]/40 uppercase tracking-wider font-sans">Postingan</p>
                      {searchPosts.map((post) => (
                        <button
                          key={`post-${post.id}`}
                          onClick={() => handleSelectPost(post.id)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#f7faf5] transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#e8f5e9] flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4 text-[#005139]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-medium text-[#393030] truncate">{post.title}</p>
                            <p className="text-[11px] text-[#393030]/50 truncate">{post.user?.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* No Results */}
            {showSearchDropdown && searchResults.length === 0 && searchPosts.length === 0 && !searchLoading && searchQuery.length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                <div className="px-4 py-6 text-center">
                  <p className="text-[13px] text-[#393030]/50">Tidak ada hasil ditemukan</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Notification + Avatar Dropdown */}
        <div className="flex items-center gap-2.5 ml-3">
          {/* Notification Bell */}
          <div ref={notifRef} className="relative">
            <button
              onClick={handleOpenNotifications}
              className="relative p-2 text-repost-text hover:bg-[#ebefea] rounded-full transition-colors"
            >
              <Bell className="w-[18px] h-[18px]" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#ba1a1a] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute top-full right-0 mt-2 w-[340px] bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <h3 className="text-[14px] font-heading font-semibold text-[#393030]">
                    Notifikasi
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-[12px] text-[#5aa9e6] hover:underline font-sans"
                    >
                      Tandai semua dibaca
                    </button>
                  )}
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-5 w-5 animate-spin text-[#005139]" />
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="py-8 text-center">
                      <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-[13px] text-gray-400 font-sans">Belum ada notifikasi</p>
                    </div>
                  ) : (
                    notifications.map((notif) => {
                      const data = notif.data
                      const isUnread = !notif.read_at
                      return (
                        <button
                          key={notif.id}
                          onClick={() => handleNotifClick(notif)}
                          className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-[#f7faf5] transition-colors text-left ${
                            isUnread ? 'bg-[#f0fdf4]' : ''
                          }`}
                        >
                          {(() => {
                            const Icon = notifIcons[data.type] || Bell
                            const color = notifColors[data.type] || 'text-gray-400'
                            const bg = notifBgColors[data.type] || 'bg-gray-100'
                            return (
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
                                <Icon className={`w-4 h-4 ${color}`} />
                              </div>
                            )
                          })()}
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] text-[#393030] font-sans leading-snug">
                              {data.message}
                            </p>
                            <p className="text-[11px] text-gray-400 mt-1 font-sans">
                              {new Date(notif.created_at).toLocaleString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                                day: 'numeric',
                                month: 'short',
                              })}
                            </p>
                          </div>
                          {isUnread && (
                            <span className="w-2 h-2 bg-[#005139] rounded-full mt-1.5 shrink-0" />
                          )}
                        </button>
                      )
                    })
                  )}
                </div>
                <Link
                  to="/notifications"
                  onClick={() => setShowNotifDropdown(false)}
                  className="block text-center py-3 text-[13px] text-[#5aa9e6] font-medium hover:bg-[#f7faf5] border-t border-gray-100 font-sans"
                >
                  Lihat Semua Notifikasi
                </Link>
              </div>
            )}
          </div>

          {/* User Avatar Dropdown */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="outline-none">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-[#005139] text-white text-xs font-medium">
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/profile/me" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-[#ba1a1a] focus:text-[#ba1a1a]">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
