import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { postsApi } from '@/api/posts'
import { useAuth } from '@/contexts/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ImageLightbox from '@/components/ui/image-lightbox'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Repeat2, ArrowLeft, Loader2, MapPin } from 'lucide-react'
import CommentList from '@/components/comments/CommentList'
import MapDisplay from '@/components/map/MapDisplay'

export default function PostDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [reposted, setReposted] = useState(false)
  const [repostsCount, setRepostsCount] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postsApi.getById(id)
        const data = res.data.data
        setPost(data)
        setLiked(data.is_liked || false)
        setLikesCount(data.likes_count || 0)
        setReposted(data.is_reposted || false)
        setRepostsCount(data.reposts_count || 0)
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

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

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-repost-blue" />
      </div>
    )
  }

  if (!post) {
    return <div className="text-center py-16 text-repost-text font-sans">Post not found</div>
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        to="/home"
        className="inline-flex items-center text-repost-text/60 hover:text-repost-text font-sans text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to feed
      </Link>

      {/* Post Card */}
      <div className="bg-white rounded-card shadow-sm overflow-hidden">
        {/* Post Header */}
        <div className="p-4 md:p-6 pb-0">
          <div className="flex items-center gap-3">
            <Link to={`/profile/${post.user?.id}`}>
              <Avatar className="h-11 w-11">
                <AvatarImage src={post.user?.avatar} alt={post.user?.name} />
                <AvatarFallback className="bg-repost-blue text-white text-sm">
                  {post.user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link
                to={`/profile/${post.user?.id}`}
                className="font-heading font-semibold text-repost-text hover:underline text-sm"
              >
                {post.user?.name}
              </Link>
              <p className="text-xs text-repost-text/50 font-sans">
                {new Date(post.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="p-4 md:p-6">
          <h1 className="text-xl md:text-2xl font-heading font-bold text-repost-text mb-3">
            {post.title}
          </h1>
          {post.body && (
            <p className="text-repost-text/80 font-sans mb-4 whitespace-pre-wrap leading-relaxed">
              {post.body}
            </p>
          )}
          {post.media_url && (
            <div className="mt-4">
              {post.media_type === 'image' ? (
                <img
                  src={post.media_url}
                  alt={post.title}
                  className="rounded-input w-full object-cover cursor-pointer"
                  onClick={() => setLightboxOpen(true)}
                />
              ) : post.media_type === 'video' ? (
                <video
                  src={post.media_url}
                  controls
                  className="rounded-input w-full max-h-[500px]"
                />
              ) : null}
            </div>
          )}
        </div>

        {/* Location Map */}
        {post.latitude && post.longitude && (
          <div className="px-4 md:px-6 pb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <MapPin className="w-4 h-4 text-[#005139]" />
              <span className="text-sm font-medium text-repost-text font-sans">
                {post.location_name || 'Lokasi Kejadian'}
              </span>
            </div>
            <MapDisplay
              latitude={post.latitude}
              longitude={post.longitude}
              locationName={post.location_name}
            />
          </div>
        )}

        {/* Post Actions */}
        <div className="px-4 md:px-6 py-4 border-t border-gray-100 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`gap-2 ${liked ? 'text-red-500' : 'text-repost-text/60'}`}
          >
            <Heart className={`h-5 w-5 ${liked ? 'fill-red-500' : ''}`} />
            <span className="font-sans text-sm">{likesCount}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-repost-text/60"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="font-sans text-sm">{post.comments_count || 0}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRepost}
            className={`gap-2 ${reposted ? 'text-repost-green' : 'text-repost-text/60'}`}
          >
            <Repeat2 className={`h-5 w-5 ${reposted ? 'fill-repost-green' : ''}`} />
            <span className="font-sans text-sm">{repostsCount}</span>
          </Button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-card shadow-sm p-4 md:p-6">
        <h2 className="text-lg font-heading font-semibold text-repost-text mb-4">
          Comments
        </h2>
        <CommentList postId={post.id} />
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
