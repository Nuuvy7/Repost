import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { usersApi } from '@/api/users'
import { postsApi } from '@/api/posts'
import { useAuth } from '@/contexts/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Camera, TrendingUp, Users, Award, ChevronDown, Heart, MessageCircle, FileText, UserPlus, UserCheck, X } from 'lucide-react'
import ProfilePostCard from '@/components/posts/ProfilePostCard'
import LavaLampBackground from '@/components/effects/LavaLampBackground'
import AvatarCropper from '@/components/ui/avatar-cropper'
import MiniChart from '@/components/ui/mini-chart'

export default function ProfilePage() {
  const { id } = useParams()
  const { user: currentUser } = useAuth()
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', bio: '', role: '' })
  const [isFollowing, setIsFollowing] = useState(false)
  const [followersCount, setFollowersCount] = useState(0)
  const [followLoading, setFollowLoading] = useState(false)
  const [avatarUploading, setAvatarUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [cropperOpen, setCropperOpen] = useState(false)
  const [followersModalOpen, setFollowersModalOpen] = useState(false)
  const [followersList, setFollowersList] = useState([])
  const [followersLoading, setFollowersLoading] = useState(false)
  const [reputation, setReputation] = useState(0)
  const [stats, setStats] = useState({ labels: [], posts: [], reposts: [] })
  const fileInputRef = useRef(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = id === 'me' ? currentUser?.id : id
        if (!userId) {
          setLoading(false)
          return
        }
        const [userRes, postsRes, statsRes] = await Promise.all([
          usersApi.getById(userId),
          postsApi.getAll({ user_id: userId, per_page: 20 }),
          usersApi.getStats(userId),
        ])
        const userData = userRes.data.data || userRes.data.user
        setProfile(userData)
        setForm({ name: userData.name || '', bio: userData.bio || '', role: userData.role || '' })
        setFollowersCount(userData.followers_count || 0)
        setIsFollowing(userData.is_following || false)
        setReputation(userData.reputation || 0)
        setPosts(postsRes.data.data || [])
        setStats(statsRes.data || { labels: [], posts: [], reposts: [] })
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }
    if (currentUser || id !== 'me') fetchProfile()
  }, [id, currentUser])

  const handleSave = async () => {
    setSaving(true)
    try {
      await usersApi.updateProfile(form)
      setProfile({ ...profile, ...form })
      setEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleFollow = async () => {
    setFollowLoading(true)
    try {
      const res = await usersApi.follow(profile.id)
      setIsFollowing(res.data.following)
      setFollowersCount(res.data.followers_count)
    } catch (error) {
      console.error('Error toggling follow:', error)
    } finally {
      setFollowLoading(false)
    }
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    setCropperOpen(true)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleAvatarCrop = async (blob) => {
    setAvatarUploading(true)
    setCropperOpen(false)
    try {
      const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' })
      const res = await usersApi.uploadAvatar(file)
      const newAvatarUrl = res.data.avatar_url
      setProfile({ ...profile, avatar: newAvatarUrl })
    } catch (error) {
      console.error('Error uploading avatar:', error)
    } finally {
      setAvatarUploading(false)
      setSelectedFile(null)
    }
  }

  const handleAvatarCropClose = () => {
    setCropperOpen(false)
    setSelectedFile(null)
  }

  const handleShowFollowers = async () => {
    setFollowersLoading(true)
    setFollowersModalOpen(true)
    try {
      const res = await usersApi.getFollowers(profile.id)
      setFollowersList(res.data.followers || [])
    } catch (error) {
      console.error('Error fetching followers:', error)
    } finally {
      setFollowersLoading(false)
    }
  }

  const getPercentageChange = (data) => {
    if (!data || data.length < 2) return null
    const recent = data[data.length - 1]
    const previous = data[data.length - 2]
    if (previous === 0) return recent > 0 ? 100 : 0
    return Math.round(((recent - previous) / previous) * 100)
  }

  const postChange = getPercentageChange(stats.posts)
  const repostChange = getPercentageChange(stats.reposts)

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-[#5aa9e6]" />
      </div>
    )
  }

  if (!profile) {
    return <div className="text-center py-16 text-[#393030] font-sans">Profile not found</div>
  }

  const isOwnProfile = currentUser?.id === profile.id

  return (
    <div className="relative max-w-[1200px] mx-auto">
      <LavaLampBackground />

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 relative z-10">
        {/* LEFT COLUMN - Profile Info & Stats */}
        <div className="w-full md:w-[350px] shrink-0 space-y-4">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
            {/* Avatar */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative">
                <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="bg-[#e8f0fe] text-[#5aa9e6] text-3xl font-heading">
                    {profile.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {isOwnProfile && (
                  <>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={avatarUploading}
                      className="absolute bottom-0 right-0 w-8 h-8 bg-[#5aa9e6] rounded-full flex items-center justify-center text-white shadow-md hover:bg-[#4a90d9] transition-colors disabled:opacity-50"
                    >
                      {avatarUploading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Name & Role */}
            {editing ? (
              <div className="space-y-3 mb-4">
                <div>
                  <label className="text-xs font-medium text-[#393030] font-sans block mb-1">Name</label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-10 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#393030] font-sans block mb-1">Role</label>
                  <Input
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. Senior Urban Reporter"
                    className="h-10 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#393030] font-sans block mb-1">Bio</label>
                  <Textarea
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    placeholder="Write something about yourself..."
                    className="text-sm"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSave} disabled={saving} className="bg-[#005139] hover:bg-[#003d2a] text-white">
                    {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                    Save
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center mb-4">
                <h1 className="text-2xl font-heading font-bold text-[#393030]">
                  {profile.name}
                </h1>
                {profile.role && (
                  <p className="text-[#005139] text-xs font-semibold tracking-widest uppercase mt-1 font-sans">
                    {profile.role}
                  </p>
                )}
                {profile.bio && (
                  <p className="text-[#393030]/70 font-sans text-sm mt-3 leading-relaxed">
                    {profile.bio}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            {!editing && (
              <div className="flex gap-2 justify-center">
                {isOwnProfile ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditing(true)}
                    className="rounded-full border-[#005139] text-[#005139] hover:bg-[#005139]/5"
                  >
                    Edit Profil
                  </Button>
                ) : (
                  <>
                    <Button
                      size="sm"
                      onClick={handleFollow}
                      disabled={followLoading}
                      className={`rounded-full ${
                        isFollowing
                          ? 'bg-gray-100 text-[#393030] hover:bg-gray-200'
                          : 'bg-[#005139] text-white hover:bg-[#003d2a]'
                      }`}
                    >
                      {followLoading ? (
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      ) : isFollowing ? (
                        <UserCheck className="w-4 h-4 mr-1" />
                      ) : (
                        <UserPlus className="w-4 h-4 mr-1" />
                      )}
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="space-y-4">
              {/* Laporan */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#393030]/50" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#393030]/50 font-sans">Laporan</span>
                </div>
                {postChange !== null && postChange !== 0 && (
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    postChange > 0 ? 'text-[#005139] bg-[#005139]/10' : 'text-[#ba1a1a] bg-[#ba1a1a]/10'
                  }`}>
                    {postChange > 0 ? '+' : ''}{postChange}%
                  </span>
                )}
              </div>
              <div className="text-4xl font-heading font-bold text-[#393030]">{posts.length}</div>
              <MiniChart data={stats.posts} color="#5aa9e6" />

              <div className="border-t border-gray-100" />

              {/* Pengikut */}
              <button
                onClick={handleShowFollowers}
                className="flex items-center justify-between w-full text-left hover:bg-gray-50 -mx-2 px-2 py-1 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#393030]/50" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#393030]/50 font-sans">Pengikut</span>
                </div>
                <span className="text-xs font-semibold text-[#005139] bg-[#005139]/10 px-2 py-0.5 rounded-full">
                  {followersCount >= 1000 ? `${(followersCount / 1000).toFixed(1)}k` : followersCount}
                </span>
              </button>
              <div className="text-4xl font-heading font-bold text-[#393030]">
                {followersCount >= 1000 ? `${(followersCount / 1000).toFixed(1)}k` : followersCount}
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${i < 3 ? 'bg-[#ffe45e]' : i < 4 ? 'bg-[#ffe45e]/60' : 'bg-gray-200'}`} />
                ))}
              </div>

              <div className="border-t border-gray-100" />

              {/* Reputasi */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#393030]/50" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#393030]/50 font-sans">Reputasi</span>
                </div>
                {repostChange !== null && repostChange !== 0 && (
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    repostChange > 0 ? 'text-[#005139] bg-[#005139]/10' : 'text-[#ba1a1a] bg-[#ba1a1a]/10'
                  }`}>
                    {repostChange > 0 ? '+' : ''}{repostChange}%
                  </span>
                )}
              </div>
              <div className="text-4xl font-heading font-bold text-[#393030]">
                {reputation >= 1000 ? `${(reputation / 1000).toFixed(1)}k` : reputation}
              </div>
              <MiniChart data={stats.reposts} color="#005139" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Posts */}
        <div className="flex-1 min-w-0">
          {/* Filter Header */}
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-[#5aa9e6]" />
            <span className="text-sm font-medium text-[#393030] font-sans">Laporan Saya</span>
            <ChevronDown className="w-4 h-4 text-[#393030]/50" />
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {posts.map((post) => (
              <ProfilePostCard key={post.id} post={post} />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <FileText className="w-12 h-12 text-[#393030]/20 mx-auto mb-3" />
              <p className="text-[#393030]/50 font-sans">Belum ada laporan</p>
            </div>
          )}
        </div>
      </div>

      <AvatarCropper
        file={selectedFile}
        open={cropperOpen}
        onSave={handleAvatarCrop}
        onClose={handleAvatarCropClose}
      />

      {/* Followers Modal */}
      {followersModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-in fade-in duration-200"
          onClick={() => setFollowersModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-[360px] max-h-[70vh] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-bold text-[#393030]">Pengikut</h3>
              <button onClick={() => setFollowersModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5 text-[#393030]" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[55vh]">
              {followersLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-[#5aa9e6]" />
                </div>
              ) : followersList.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-10 h-10 text-[#393030]/20 mx-auto mb-2" />
                  <p className="text-[#393030]/50 font-sans text-sm">Belum ada pengikut</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {followersList.map((follower) => (
                    <Link
                      key={follower.id}
                      to={`/profile/${follower.id}`}
                      onClick={() => setFollowersModalOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={follower.avatar} alt={follower.name} />
                        <AvatarFallback className="bg-[#e8f0fe] text-[#5aa9e6] text-sm font-heading">
                          {follower.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#393030] truncate">{follower.name}</p>
                        <p className="text-xs text-[#393030]/50 truncate">@{follower.username}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
