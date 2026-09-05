import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Repeat2, MapPin } from 'lucide-react'
import { postsApi } from '@/api/posts'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import ImageLightbox from '@/components/ui/image-lightbox'

const statusConfig = {
  diproses: { label: 'DIPROSES', bg: 'bg-[#ffe45e]', text: 'text-[#393030]' },
  selesai: { label: 'SELESAI', bg: 'bg-[#89f87f]', text: 'text-[#005139]' },
  ditolak: { label: 'DITOLAK', bg: 'bg-[#ba1a1a]', text: 'text-white' },
}

const locationColorMap = {
  jakut: { bg: 'bg-[#f3e8ff]', text: 'text-[#7C3AED]' },
  jaksel: { bg: 'bg-[#dbeafe]', text: 'text-[#2563EB]' },
  jakpus: { bg: 'bg-[#fff7ed]', text: 'text-[#EA580C]' },
  jaktim: { bg: 'bg-[#f0fdfa]', text: 'text-[#0D9488]' },
  jakbar: { bg: 'bg-[#fdf2f8]', text: 'text-[#DB2777]' },
}

const locationRegions = {
  jakut:  ['jakut', 'jakarta utara'],
  jaksel: ['jaksel', 'jakarta selatan'],
  jakpus: ['jakpus', 'jakarta pusat'],
  jaktim: ['jaktim', 'jakarta timur'],
  jakbar: ['jakbar', 'jakarta barat'],
}

function getLocationStyle(name) {
  if (!name) return { bg: 'bg-[#e8f5e9]', text: 'text-[#005139]' }
  const lower = name.toLowerCase()
  for (const [key, keywords] of Object.entries(locationRegions)) {
    if (keywords.some(kw => lower.includes(kw))) return locationColorMap[key]
  }
  return { bg: 'bg-[#e8f5e9]', text: 'text-[#005139]' }
}

export default function PostCard({ post, onUpdate }) {
  const { user } = useAuth()
  const [liked, setLiked] = useState(post.is_liked)
  const [likesCount, setLikesCount] = useState(post.likes_count || 0)
  const [reposted, setReposted] = useState(post.is_reposted)
  const [repostsCount, setRepostsCount] = useState(post.reposts_count || 0)

  const handleLike = async () => {
    if (!user) return
    try {
      if (liked) {
        const res = await postsApi.unlike(post.id)
        setLiked(false)
        setLikesCount(res.data.count)
      } else {
        const res = await postsApi.like(post.id)
        setLiked(true)
        setLikesCount(res.data.count)
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  const handleRepost = async () => {
    if (!user) return
    try {
      const res = await postsApi.toggleRepost(post.id)
      setReposted(res.data.reposted)
      setRepostsCount(res.data.count)
    } catch (error) {
      console.error('Error toggling repost:', error)
    }
  }

  const status = post.status ? statusConfig[post.status.toLowerCase()] : null
  const location = post.location_name || null
  const locationStyle = getLocationStyle(location)
  const tags = post.tags || []
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <div className="bg-white rounded-[14px] shadow-sm overflow-hidden">
      {/* Post Header */}
      <div className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Link to={`/profile/${post.user?.id}`}>
              <Avatar className="h-9 w-9">
                <AvatarImage src={post.user?.avatar} alt={post.user?.name} />
                <AvatarFallback className="bg-[#e8f5e9] text-[#005139] text-xs font-medium">
                  {post.user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  to={`/profile/${post.user?.id}`}
                  className="font-heading font-bold text-[14px] text-repost-text hover:underline"
                >
                  {post.user?.name}
                </Link>
                {location && (
                  <span className={`flex items-center gap-0.5 ${locationStyle.bg} ${locationStyle.text} text-[10px] font-medium px-2 py-0.5 rounded-full`}>
                    <MapPin className="w-2.5 h-2.5" />
                    {location}
                  </span>
                )}
                {status && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>
                    {status.label}
                  </span>
                )}
              </div>
              <p className="text-[12px] text-repost-text/50 font-sans mt-0.5">
                {post.user?.name} · {new Date(post.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 py-3">
        <Link to={`/post/${post.id}`}>
          <h3 className="text-[15px] font-heading font-semibold text-repost-text hover:underline mb-2 leading-relaxed">
            {post.title}
          </h3>
        </Link>
        {post.body && (
          <p className="text-repost-text/70 font-sans text-[13px] mb-3 leading-relaxed">
            {post.body}
          </p>
        )}
        {post.media_url && (
          <div className="mt-2">
            {post.media_type === 'image' ? (
              <img
                src={post.media_url}
                alt={post.title}
                className="rounded-[10px] w-full object-cover max-h-[600px] cursor-pointer"
                onClick={() => setLightboxOpen(true)}
              />
            ) : post.media_type === 'video' ? (
              <video
                src={post.media_url}
                controls
                className="rounded-[10px] w-full max-h-[380px]"
              />
            ) : null}
          </div>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="px-4 pb-3 flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-[#f5f5f5] text-repost-text/70 text-[12px] px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`gap-1.5 rounded-full px-3 ${liked ? 'text-[#ba1a1a]' : 'text-repost-text/50 hover:text-[#ba1a1a]'}`}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-[#ba1a1a]' : ''}`} />
            <span className="font-sans text-[13px]">{likesCount}</span>
          </Button>

          <Link to={`/post/${post.id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 rounded-full px-3 text-repost-text/50 hover:text-repost-text"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="font-sans text-[13px]">{post.comments_count || 0}</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRepost}
            className={`gap-1.5 rounded-full px-3 ${reposted ? 'text-[#5aa9e6]' : 'text-repost-text/50 hover:text-[#5aa9e6]'}`}
          >
            <Repeat2 className={`h-4 w-4 ${reposted ? 'fill-[#5aa9e6]' : ''}`} />
            <span className="font-sans text-[13px]">{repostsCount}</span>
          </Button>
        </div>
      </div>

      {post.media_url && post.media_type === 'image' && (
        <ImageLightbox
          src={post.media_url}
          alt={post.title}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  )
}
