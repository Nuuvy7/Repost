import { useState, useEffect } from 'react'
import { commentsApi } from '@/api/comments'
import { useAuth } from '@/contexts/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Trash2 } from 'lucide-react'

export default function CommentList({ postId }) {
  const { user } = useAuth()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchComments = async () => {
    try {
      const res = await commentsApi.getByPost(postId)
      setComments(res.data.data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setSubmitting(true)
    try {
      const res = await commentsApi.create(postId, { body: newComment })
      setComments((prev) => [res.data.comment, ...prev])
      setNewComment('')
    } catch (error) {
      console.error('Error posting comment:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (commentId) => {
    try {
      await commentsApi.delete(postId, commentId)
      setComments((prev) => prev.filter((c) => c.id !== commentId))
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <Loader2 className="h-6 w-6 animate-spin text-repost-blue" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {user && (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-repost-blue text-white text-xs">
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={2}
              className="flex-1 text-sm"
            />
            <Button
              type="submit"
              size="sm"
              disabled={submitting || !newComment.trim()}
              className="rounded-button self-end"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Post'}
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarImage src={comment.user?.avatar} alt={comment.user?.name} />
              <AvatarFallback className="bg-repost-blue text-white text-xs">
                {comment.user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 bg-gray-50 rounded-input p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-heading font-medium text-sm text-repost-text">
                  {comment.user?.name}
                </span>
                <span className="text-xs text-repost-text/40 font-sans">
                  {new Date(comment.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                {user?.id === comment.user_id && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 ml-auto text-repost-text/40 hover:text-repost-red"
                    onClick={() => handleDelete(comment.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <p className="text-sm text-repost-text/80 font-sans">{comment.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
