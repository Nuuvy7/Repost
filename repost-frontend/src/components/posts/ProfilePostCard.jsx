import { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Heart, MessageCircle } from 'lucide-react'
import ImageLightbox from '@/components/ui/image-lightbox'

const statusConfig = {
  diproses: { label: 'DIPROSES', bg: 'bg-[#ffe45e]', text: 'text-[#393030]' },
  selesai: { label: 'SELESAI', bg: 'bg-[#89f87f]', text: 'text-[#005139]' },
  ditolak: { label: 'DITOLAK', bg: 'bg-[#ba1a1a]', text: 'text-white' },
}

export default function ProfilePostCard({ post }) {
  const status = statusConfig[post.status] || statusConfig.diproses
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const formatDate = (date) => {
    const d = new Date(date)
    const now = new Date()
    const diffMs = now - d
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} MENIT YANG LALU`
    if (diffHours < 24) return `${diffHours} JAM YANG LALU`
    if (diffDays < 7) return `${diffDays} HARI YANG LALU`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} MINGGU YANG LALU`
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <>
    <Link to={`/post/${post.id}`} className="block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
        {/* Image Thumbnail */}
        {post.media_url && (
          <div className="relative h-40 overflow-hidden">
            <img
              src={post.media_url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLightboxOpen(true) }}
            />
            {/* Status Badge */}
            <div className="absolute top-3 left-3">
              <span className={`${status.bg} ${status.text} text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1`}>
                <span className="w-1.5 h-1.5 bg-current rounded-full" />
                {status.label}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {/* Time & Category */}
          <div className="flex items-center gap-1 text-[10px] text-[#393030]/50 font-sans uppercase tracking-wider mb-2">
            <span>{formatDate(post.created_at)}</span>
            {post.category && (
              <>
                <span>•</span>
                <span>{post.category}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-[#393030] text-sm leading-snug mb-3 line-clamp-2 group-hover:text-[#005139] transition-colors">
            {post.title}
          </h3>

          {/* Stats */}
          <div className="flex items-center gap-3 text-[#393030]/50">
            <div className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              <span className="text-xs font-sans">{post.likes_count || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="text-xs font-sans">{post.comments_count || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>

    {post.media_url && (
      <ImageLightbox
        src={post.media_url}
        alt={post.title}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    )}
    </>
  )
}
