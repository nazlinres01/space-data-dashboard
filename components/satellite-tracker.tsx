"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SatelliteTracker() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedSatellite, setSelectedSatellite] = useState("iss")

  const satellites = {
    iss: {
      name: "Uluslararası Uzay İstasyonu",
      altitude: "408 km",
      velocity: "27,600 km/s",
      inclination: "51.6°",
      period: "92.68 dakika",
      launch: "20 Kasım 1998",
      color: "#3498db",
    },
    hubble: {
      name: "Hubble Uzay Teleskobu",
      altitude: "547 km",
      velocity: "27,300 km/s",
      inclination: "28.5°",
      period: "96.7 dakika",
      launch: "24 Nisan 1990",
      color: "#2ecc71",
    },
    tiangong: {
      name: "Tiangong Uzay İstasyonu",
      altitude: "389 km",
      velocity: "27,600 km/s",
      inclination: "41.5°",
      period: "92 dakika",
      launch: "29 Nisan 2021",
      color: "#e74c3c",
    },
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Animation variables
    let animationFrameId: number
    let angle = 0

    // Earth and satellite dimensions
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const earthRadius = 80
    const orbitRadius = 120

    // Animation function
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw space background
      ctx.fillStyle = "#0f172a"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 1.2
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, " + Math.random() * 0.8 + ")"
        ctx.fill()
      }

      // Draw orbit
      ctx.beginPath()
      ctx.ellipse(centerX, centerY, orbitRadius, orbitRadius * 0.8, 0, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
      ctx.setLineDash([5, 5])
      ctx.stroke()
      ctx.setLineDash([])

      // Draw Earth
      const earthGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, earthRadius)
      earthGradient.addColorStop(0, "#1e3a8a")
      earthGradient.addColorStop(1, "#3b82f6")

      ctx.beginPath()
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2)
      ctx.fillStyle = earthGradient
      ctx.fill()

      // Draw satellite
      const satelliteX = centerX + Math.cos(angle) * orbitRadius
      const satelliteY = centerY + Math.sin(angle) * orbitRadius * 0.8

      // Draw satellite trail
      ctx.beginPath()
      ctx.arc(centerX, centerY, orbitRadius, angle - 0.5, angle)
      ctx.strokeStyle = satellites[selectedSatellite as keyof typeof satellites].color
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw satellite
      ctx.beginPath()
      ctx.arc(satelliteX, satelliteY, 5, 0, Math.PI * 2)
      ctx.fillStyle = satellites[selectedSatellite as keyof typeof satellites].color
      ctx.fill()

      // Update angle for next frame
      angle += 0.01
      if (angle > Math.PI * 2) angle = 0

      // Continue animation
      animationFrameId = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [selectedSatellite])

  const selectedSatelliteData = satellites[selectedSatellite as keyof typeof satellites]

  return (
    <Card className="bg-slate-950 border-slate-800 text-white">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle>Uydu Takibi</CardTitle>
            <CardDescription className="text-slate-400">Gerçek zamanlı uydu konumları</CardDescription>
          </div>
          <Select value={selectedSatellite} onValueChange={setSelectedSatellite}>
            <SelectTrigger className="w-[180px] bg-slate-900 border-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-950 border-slate-800">
              <SelectItem value="iss">Uluslararası Uzay İstasyonu</SelectItem>
              <SelectItem value="hubble">Hubble Uzay Teleskobu</SelectItem>
              <SelectItem value="tiangong">Tiangong Uzay İstasyonu</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <canvas ref={canvasRef} width={300} height={300} className="w-full h-[250px] rounded-md" />
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-lg">{selectedSatelliteData.name}</h3>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-slate-400">Yükseklik</p>
                <p className="font-medium">{selectedSatelliteData.altitude}</p>
              </div>
              <div>
                <p className="text-slate-400">Hız</p>
                <p className="font-medium">{selectedSatelliteData.velocity}</p>
              </div>
              <div>
                <p className="text-slate-400">Eğim</p>
                <p className="font-medium">{selectedSatelliteData.inclination}</p>
              </div>
              <div>
                <p className="text-slate-400">Yörünge Periyodu</p>
                <p className="font-medium">{selectedSatelliteData.period}</p>
              </div>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Fırlatma Tarihi</p>
              <p className="font-medium">{selectedSatelliteData.launch}</p>
            </div>

            <Badge className="mt-2" style={{ backgroundColor: selectedSatelliteData.color }}>
              Aktif
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
