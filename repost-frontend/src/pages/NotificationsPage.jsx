import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { notificationsApi } from '@/api/notifications'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2, Bell, ArrowLeft, Check, CheckCheck, Repeat2, Heart, MessageCircle, FileText, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import LavaLampBackground from '@/components/effects/LavaLampBackground'

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

export default function NotificationsPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const pollingRef = useRef(null)

  const fetchNotifications = useCallback(async (pageNum = 1, append = false) => {
    try {
      const res = await notificationsApi.getAll({ page: pageNum, per_page: 20 })
      const newNotifs = res.data.notifications || []
      if (append) {
        setNotifications((prev) => [...prev, ...newNotifs])
      } else {
        setNotifications(newNotifs)
      }
      setHasMore(res.data.meta.current_page < res.data.meta.last_page)
    } catch (err) {
      console.error('Error fetching notifications:', err)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  const fetchUnread = useCallback(async () => {
    try {
      const res = await notificationsApi.getUnreadCount()
      setUnreadCount(res.data.count)
    } catch (err) {
      // silent
    }
  }, [])

  useEffect(() => {
    if (!user) return
    fetchNotifications(1, false)
    fetchUnread()
    pollingRef.current = setInterval(fetchUnread, 1000)
    return () => clearInterval(pollingRef.current)
  }, [user, fetchNotifications, fetchUnread])

  const handleNotifClick = async (notif) => {
    try {
      await notificationsApi.markAsRead(notif.id)
      setUnreadCount((prev) => Math.max(0, prev - 1))
      setNotifications((prev) =>
        prev.map((n) => (n.id === notif.id ? { ...n, read_at: new Date().toISOString() } : n))
      )
    } catch (err) {
      // silent
    }
    const data = notif.data
    if (data.type === 'follow') {
      navigate(`/profile/${data.follower_id}`)
    } else if (data.post_id) {
      navigate(`/post/${data.post_id}`)
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

  const handleLoadMore = () => {
    setLoadingMore(true)
    const nextPage = page + 1
    setPage(nextPage)
    fetchNotifications(nextPage, true)
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-[#5aa9e6]" />
      </div>
    )
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      <LavaLampBackground />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-[#ebefea] rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#393030]" />
            </button>
            <div>
              <h1 className="text-xl font-heading font-bold text-[#393030]">Notifikasi</h1>
              {unreadCount > 0 && (
                <p className="text-[12px] text-[#5aa9e6] font-sans">{unreadCount} belum dibaca</p>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllRead}
              className="text-[#5aa9e6] hover:text-[#4a90d9] text-[13px]"
            >
              <CheckCheck className="w-4 h-4 mr-1.5" />
              Tandai semua dibaca
            </Button>
          )}
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-[#393030]/50 font-sans">Belum ada notifikasi</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notif) => {
              const data = notif.data
              const isUnread = !notif.read_at
              const avatar =
                data.reposter_avatar || data.follower_avatar || data.author_avatar || data.liker_avatar || data.commenter_avatar
              const name =
                data.follower_name || data.author_name || data.liker_name || data.commenter_name

              return (
                <button
                  key={notif.id}
                  onClick={() => handleNotifClick(notif)}
                  className={`w-full flex items-start gap-3 p-4 rounded-2xl transition-all text-left ${
                    isUnread
                      ? 'bg-white shadow-sm border border-[#005139]/10 hover:shadow-md'
                      : 'bg-white/60 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <div className="relative shrink-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={avatar} alt={name} />
                      <AvatarFallback className="bg-[#e8f5e9] text-[#005139] text-xs font-medium">
                        {name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {(() => {
                      const Icon = notifIcons[data.type] || Bell
                      const color = notifColors[data.type] || 'text-gray-400'
                      const bg = notifBgColors[data.type] || 'bg-gray-100'
                      return (
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white ${bg}`}>
                          <Icon className={`w-2.5 h-2.5 ${color}`} />
                        </div>
                      )
                    })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-[#393030] font-sans leading-relaxed">
                      {data.message}
                    </p>
                    {data.comment_body && (
                      <p className="text-[12px] text-[#393030]/50 font-sans mt-1 line-clamp-2 italic">
                        &ldquo;{data.comment_body}&rdquo;
                      </p>
                    )}
                    <p className="text-[11px] text-gray-400 mt-1.5 font-sans">
                      {new Date(notif.created_at).toLocaleString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  {isUnread && (
                    <span className="w-2.5 h-2.5 bg-[#005139] rounded-full mt-1.5 shrink-0" />
                  )}
                </button>
              )
            })}

            {hasMore && (
              <div className="flex justify-center py-4">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="rounded-full px-6 py-2 font-heading text-[13px]"
                >
                  {loadingMore ? (
                    <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  ) : null}
                  Load More
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
