import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import api from '@/api/axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Send, CheckCircle2, HelpCircle, MessageSquare } from 'lucide-react'

export default function HelpPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/support', form)
      setSuccess(true)
      setForm({ name: user?.name || '', email: user?.email || '', subject: '', message: '' })
    } catch (error) {
      console.error('Error sending support:', error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-[600px] mx-auto py-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <div className="w-16 h-16 bg-[#005139]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-[#005139]" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-[#393030] mb-2">
            Pesan Berhasil Dikirim!
          </h2>
          <p className="text-[#393030]/60 font-sans mb-6">
            Tim customer service kami akan segera menghubungi Anda melalui email yang sudah terdaftar.
          </p>
          <Button
            onClick={() => setSuccess(false)}
            className="rounded-full bg-[#005139] hover:bg-[#003d2a] text-white px-6"
          >
            Kirim Pesan Lain
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[600px] mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#5aa9e6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-[#5aa9e6]" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-[#393030] mb-2">
          Hubungi Kami
        </h1>
        <p className="text-[#393030]/60 font-sans">
          Ada kendala? Kami siap membantu Anda.
        </p>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-5 h-5 text-[#005139]" />
          <h2 className="text-lg font-heading font-bold text-[#393030]">Kirim Pesan</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[#393030] font-sans block mb-1.5">Nama</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nama Anda"
                required
                className="h-11 rounded-xl border-gray-200"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#393030] font-sans block mb-1.5">Email</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@domain.com"
                required
                className="h-11 rounded-xl border-gray-200"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[#393030] font-sans block mb-1.5">Subjek</label>
            <Input
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="Perihal pesan Anda"
              required
              className="h-11 rounded-xl border-gray-200"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[#393030] font-sans block mb-1.5">Pesan</label>
            <Textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Jelaskan kendala yang Anda alami..."
              required
              rows={5}
              className="rounded-xl border-gray-200 resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-[#005139] hover:bg-[#003d2a] text-white font-medium"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            {loading ? 'Mengirim...' : 'Kirim Pesan'}
          </Button>
        </form>
      </div>
    </div>
  )
}
