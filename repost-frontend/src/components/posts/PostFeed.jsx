import { useState, useEffect, useRef } from 'react'
import { postsApi } from '@/api/posts'
import PostCard from './PostCard'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PostFeed({ activeFilter = 'all' }) {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const feedRef = useRef(null)
  const cardRefs = useRef([])

  const fetchPosts = async (pageNum = 1) => {
    try {
      const params = { page: pageNum, per_page: 15 }
      if (activeFilter !== 'all') {
        params.location = activeFilter
      }
      const res = await postsApi.getAll(params)
      const newPosts = res.data.data
      if (pageNum === 1) {
        setPosts(newPosts)
      } else {
        setPosts((prev) => [...prev, ...newPosts])
      }
      setHasMore(res.data.meta.current_page < res.data.meta.last_page)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    setPage(1)
    fetchPosts(1)
  }, [activeFilter])

  useEffect(() => {
    if (loading || posts.length === 0) return

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (card) {
          gsap.from(card, {
            y: 30,
            opacity: 0,
            duration: 0.5,
            delay: i * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          })
        }
      })
    }, feedRef)

    return () => ctx.revert()
  }, [posts, loading])

  const handleLoadMore = () => {
    setLoadingMore(true)
    const nextPage = page + 1
    setPage(nextPage)
    fetchPosts(nextPage)
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-7 w-7 animate-spin text-[#005139]" />
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-repost-text/50 font-sans text-[14px]">Belum ada postingan</p>
      </div>
    )
  }

  return (
    <div ref={feedRef} className="space-y-4">
      {posts.map((post, i) => (
        <div key={post.id} ref={(el) => (cardRefs.current[i] = el)}>
          <PostCard post={post} />
        </div>
      ))}
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
  )
}
