import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { postsApi } from '@/api/posts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, ImagePlus, X, MapPin } from 'lucide-react'
import MapPicker from '@/components/map/MapPicker'

export default function PostForm() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ title: '', body: '', location_name: '' })
  const [location, setLocation] = useState({ latitude: null, longitude: null })

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
      return
    }
    setError('')
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    setPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleLocationSelect = ({ latitude, longitude }) => {
    setLocation({ latitude, longitude })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      let mediaUrl = null
      let mediaType = 'text'
      if (selectedFile) {
        const uploadRes = await postsApi.upload(selectedFile)
        mediaUrl = uploadRes.data.url
        mediaType = 'image'
      }
      const data = {
        title: form.title,
        body: form.body || null,
        media_url: mediaUrl,
        media_type: mediaType,
        latitude: location.latitude,
        longitude: location.longitude,
        location_name: form.location_name || null,
      }
      const res = await postsApi.create(data)
      navigate(`/post/${res.data.post.id}`)
    } catch (err) {
      const errors = err.response?.data?.errors
      if (errors) {
        setError(Object.values(errors)[0]?.[0] || 'Failed to create post')
      } else {
        setError(err.response?.data?.message || 'Failed to create post')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <h2 className="text-xl font-heading font-bold text-repost-text mb-6">
        Create New Post
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-input font-sans">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-repost-text font-sans">Title</label>
          <Input
            placeholder="Enter post title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-repost-text font-sans">Content</label>
          <Textarea
            placeholder="What's on your mind?"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            rows={4}
          />
        </div>

        <div>
          {preview ? (
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Preview"
                className="rounded-input max-h-64 object-cover max-w-full"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7 rounded-full"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className="border-2 border-dashed border-gray-200 rounded-card p-6 md:p-10 text-center cursor-pointer hover:border-repost-blue/50 transition-colors bg-gray-50/50"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="h-10 w-10 mx-auto mb-3 text-repost-text/30" />
              <p className="text-sm text-repost-text/50 font-sans">
                Click to upload an image (max 10MB)
              </p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#005139]" />
            <label className="text-sm font-medium text-repost-text font-sans">Lokasi Kejadian</label>
          </div>
          <Input
            placeholder="Nama lokasi (contoh: Jakarta Selatan)"
            value={form.location_name}
            onChange={(e) => setForm({ ...form, location_name: e.target.value })}
          />
          <MapPicker onLocationSelect={handleLocationSelect} />
        </div>

        <Button
          type="submit"
          className="w-full bg-repost-blue text-white hover:bg-repost-blue/90 h-12 rounded-button font-heading"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : null}
          Create Post
        </Button>
      </form>
    </div>
  )
}
