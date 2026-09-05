import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { MapPin, Crosshair } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

L.Marker.prototype.options.icon = defaultIcon

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng])
    },
  })

  return position ? <Marker position={position} /> : null
}

export default function MapPicker({ onLocationSelect, initialPosition }) {
  const [position, setPosition] = useState(initialPosition || [-6.2088, 106.8456])
  const [hasLocated, setHasLocated] = useState(!!initialPosition)

  useEffect(() => {
    if (!hasLocated && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude])
          setHasLocated(true)
        },
        () => {
          setHasLocated(true)
        }
      )
    }
  }, [])

  useEffect(() => {
    if (onLocationSelect) {
      onLocationSelect({
        latitude: position[0],
        longitude: position[1],
      })
    }
  }, [position])

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude])
        },
        () => {
          alert('Tidak bisa mengakses lokasi')
        }
      )
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[13px] text-repost-text/60">
          <MapPin className="w-3.5 h-3.5" />
          <span>Klik pada peta untuk menentukan lokasi</span>
        </div>
        <button
          type="button"
          onClick={handleMyLocation}
          className="flex items-center gap-1 text-[12px] text-[#005139] hover:text-[#005139]/80 font-medium"
        >
          <Crosshair className="w-3.5 h-3.5" />
          Lokasi Saya
        </button>
      </div>
      <div className="rounded-[10px] overflow-hidden border border-gray-200">
        <MapContainer
          center={position}
          zoom={14}
          style={{ height: '220px', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>
      </div>
      {position && (
        <p className="text-[11px] text-repost-text/40 font-mono">
          {position[0].toFixed(6)}, {position[1].toFixed(6)}
        </p>
      )}
    </div>
  )
}
