import { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { X, RotateCw, ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AvatarCropper({ file, open, onSave, onClose }) {
  const editorRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!editorRef.current) return
    setSaving(true)
    try {
      const canvas = editorRef.current.getImageScaledToCanvas()
      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg', 0.9)
      })
      onSave(blob)
    } catch (err) {
      console.error('Crop error:', err)
    } finally {
      setSaving(false)
    }
  }

  if (!open || !file) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-[340px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-bold text-[#393030]">Crop Avatar</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-[#393030]" />
          </button>
        </div>

        <div className="flex justify-center mb-4">
          <AvatarEditor
            ref={editorRef}
            image={file}
            width={200}
            height={200}
            borderRadius={100}
            color={[0, 0, 0, 0.6]}
            scale={scale}
            rotate={rotate}
            border={20}
            className="rounded-full"
          />
        </div>

        {/* Zoom */}
        <div className="flex items-center gap-2 mb-3">
          <ZoomOut className="w-4 h-4 text-[#393030]/50 shrink-0" />
          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#005139]"
          />
          <ZoomIn className="w-4 h-4 text-[#393030]/50 shrink-0" />
        </div>

        {/* Rotate */}
        <div className="flex items-center gap-2 mb-5">
          <RotateCw className="w-4 h-4 text-[#393030]/50 shrink-0" />
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={rotate}
            onChange={(e) => setRotate(parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#005139]"
          />
          <span className="text-xs text-[#393030]/50 w-8 text-right">{rotate}°</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-full"
          >
            Batal
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 rounded-full bg-[#005139] hover:bg-[#004230] text-white"
          >
            {saving ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </div>
    </div>
  )
}
