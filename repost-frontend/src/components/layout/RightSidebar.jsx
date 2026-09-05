import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Plus, TrendingUp, Loader2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { usersApi } from '@/api/users'
import { postsApi } from '@/api/posts'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const flairFilters = [
  { id: 'all', label: 'Semua', color: { active: '#005139', light: '#e8f5e9' } },
  { id: 'jakut', label: 'Jakut', icon: MapPin, color: { active: '#7C3AED', light: '#f3e8ff' } },
  { id: 'jaksel', label: 'Jaksel', icon: MapPin, color: { active: '#2563EB', light: '#dbeafe' } },
  { id: 'jakpus', label: 'Jakpus', icon: MapPin, color: { active: '#EA580C', light: '#fff7ed' } },
  { id: 'jaktim', label: 'Jaktim', icon: MapPin, color: { active: '#0D9488', light: '#f0fdfa' } },
  { id: 'jakbar', label: 'Jakbar', icon: MapPin, color: { active: '#DB2777', light: '#fdf2f8' } },
]

function FlairFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="bg-white rounded-[14px] p-4 shadow-sm">
      <h3 className="text-[14px] font-semibold text-repost-text mb-3 font-heading">
        Flair
      </h3>
      <div className="flex flex-wrap gap-2">
        {flairFilters.map((filter) => {
          const Icon = filter.icon
          const isActive = activeFilter === filter.id
          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all"
              style={isActive ? {
                backgroundColor: filter.color.active,
                color: 'white'
              } : {
                backgroundColor: filter.color.light,
                color: '#393030'
              }}
            >
              {Icon && <Icon className="w-3 h-3" />}
              {filter.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function PeopleYouMayKnow() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [followLoading, setFollowLoading] = useState(null)

  useEffect(() => {
    const fetchSuggested = async () => {
      try {
        const res = await usersApi.getSuggested()
        setUsers(res.data.users || [])
      } catch (error) {
        console.error('Error fetching suggested users:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSuggested()
  }, [])

  const handleFollow = async (userId) => {
    setFollowLoading(userId)
    try {
      await usersApi.follow(userId)
      setUsers(users.filter(u => u.id !== userId))
    } catch (error) {
      console.error('Error following user:', error)
    } finally {
      setFollowLoading(null)
    }
  }

  return (
    <div className="bg-white rounded-[14px] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[14px] font-semibold text-repost-text font-heading">
          People You May Know
        </h3>
        <button className="p-1.5 text-repost-text hover:bg-[#ebefea] rounded-full transition-colors">
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="w-5 h-5 animate-spin text-[#005139]" />
        </div>
      ) : users.length === 0 ? (
        <p className="text-[12px] text-[#393030]/50 text-center py-4">Tidak ada saran</p>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <button
                onClick={() => navigate(`/profile/${user.id}`)}
                className="flex items-center gap-2.5 flex-1 min-w-0 text-left"
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-[#ebefea] text-repost-text text-[10px]">
                    {user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-repost-text truncate">{user.name}</p>
                  <p className="text-[11px] text-repost-text/50">
                    {user.mutual_count > 0
                      ? `${user.mutual_count} mutual`
                      : `${user.followers_count || 0} followers`}
                  </p>
                </div>
              </button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFollow(user.id)}
                disabled={followLoading === user.id}
                className="rounded-full px-3 py-1 text-[12px] font-medium border-[#005139] text-[#005139] hover:bg-[#005139] hover:text-white shrink-0"
              >
                {followLoading === user.id ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  'Follow'
                )}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function NewsSection() {
  const navigate = useNavigate()
  const [newsItems, setNewsItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await postsApi.getTrending()
        setNewsItems(res.data.data || [])
      } catch (error) {
        console.error('Error fetching trending posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTrending()
  }, [])

  return (
    <div className="bg-white rounded-[14px] p-4 shadow-sm">
      <div className="flex items-center gap-1.5 mb-3">
        <h3 className="text-[14px] font-semibold text-repost-text font-heading">
          News
        </h3>
        <TrendingUp className="w-3.5 h-3.5 text-[#5aa9e6]" />
      </div>
      {loading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="w-5 h-5 animate-spin text-[#005139]" />
        </div>
      ) : newsItems.length === 0 ? (
        <p className="text-[12px] text-[#393030]/50 text-center py-4">Belum ada trending</p>
      ) : (
        <div className="space-y-3">
          {newsItems.map((post) => (
            <button
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`)}
              className="w-full text-left group cursor-pointer"
            >
              <p className="text-[10px] text-repost-text/50 uppercase tracking-wide mb-0.5">
                {post.status || 'Trending'}
              </p>
              <p className="text-[13px] font-medium text-repost-text group-hover:underline mb-0.5 line-clamp-2">
                {post.title}
              </p>
              <p className="text-[11px] text-[#5aa9e6]">
                {post.reposts_count || 0} Reposts
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function MobileFlairFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="xl:hidden">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {flairFilters.map((filter) => {
          const Icon = filter.icon
          const isActive = activeFilter === filter.id
          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className="flex items-center gap-1 px-4 py-2 rounded-full text-[12px] font-medium transition-all shrink-0"
              style={isActive ? {
                backgroundColor: filter.color.active,
                color: 'white'
              } : {
                backgroundColor: filter.color.light,
                color: '#393030'
              }}
            >
              {Icon && <Icon className="w-3 h-3" />}
              {filter.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function MobilePeopleYouMayKnow() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [followLoading, setFollowLoading] = useState(null)

  useEffect(() => {
    const fetchSuggested = async () => {
      try {
        const res = await usersApi.getSuggested()
        setUsers(res.data.users || [])
      } catch (error) {
        console.error('Error fetching suggested users:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSuggested()
  }, [])

  const handleFollow = async (userId) => {
    setFollowLoading(userId)
    try {
      await usersApi.follow(userId)
      setUsers(users.filter(u => u.id !== userId))
    } catch (error) {
      console.error('Error following user:', error)
    } finally {
      setFollowLoading(null)
    }
  }

  if (loading || users.length === 0) return null

  return (
    <div className="xl:hidden">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[13px] font-semibold text-repost-text font-heading">
          People You May Know
        </h3>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-[14px] p-3 shadow-sm min-w-[140px] shrink-0">
            <button
              onClick={() => navigate(`/profile/${user.id}`)}
              className="flex flex-col items-center text-center w-full"
            >
              <Avatar className="h-12 w-12 mb-2">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-[#ebefea] text-repost-text text-xs">
                  {user.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p className="text-[12px] font-medium text-repost-text truncate w-full">{user.name}</p>
              <p className="text-[10px] text-repost-text/50 mb-2">
                {user.mutual_count > 0
                  ? `${user.mutual_count} mutual`
                  : `${user.followers_count || 0} followers`}
              </p>
            </button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFollow(user.id)}
              disabled={followLoading === user.id}
              className="w-full rounded-full py-1 text-[11px] font-medium border-[#005139] text-[#005139] hover:bg-[#005139] hover:text-white"
            >
              {followLoading === user.id ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                'Follow'
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MobileNewsSection() {
  const navigate = useNavigate()
  const [newsItems, setNewsItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await postsApi.getTrending()
        setNewsItems(res.data.data || [])
      } catch (error) {
        console.error('Error fetching trending posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTrending()
  }, [])

  if (loading || newsItems.length === 0) return null

  return (
    <div className="xl:hidden">
      <div className="flex items-center gap-1.5 mb-2">
        <h3 className="text-[13px] font-semibold text-repost-text font-heading">
          News
        </h3>
        <TrendingUp className="w-3 h-3 text-[#5aa9e6]" />
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {newsItems.map((post) => (
          <button
            key={post.id}
            onClick={() => navigate(`/post/${post.id}`)}
            className="bg-white rounded-[14px] p-3 shadow-sm min-w-[200px] shrink-0 text-left"
          >
            <p className="text-[9px] text-repost-text/50 uppercase tracking-wide mb-1">
              {post.status || 'Trending'}
            </p>
            <p className="text-[12px] font-medium text-repost-text mb-1 line-clamp-2">
              {post.title}
            </p>
            <p className="text-[10px] text-[#5aa9e6]">
              {post.reposts_count || 0} Reposts
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function RightSidebar({ onFilterChange, activeFilter }) {
  const containerRef = useRef(null)
  const sectionRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((section, i) => {
        if (section) {
          gsap.from(section, {
            x: 25,
            opacity: 0,
            duration: 0.4,
            delay: i * 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          })
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-[260px] hidden xl:block space-y-4">
      <div ref={(el) => (sectionRefs.current[0] = el)}>
        <FlairFilter activeFilter={activeFilter} onFilterChange={onFilterChange} />
      </div>
      <div ref={(el) => (sectionRefs.current[1] = el)}>
        <PeopleYouMayKnow />
      </div>
      <div ref={(el) => (sectionRefs.current[2] = el)}>
        <NewsSection />
      </div>
    </div>
  )
}
