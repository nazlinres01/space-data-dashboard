"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCw, RotateCcw, Maximize, Minimize } from "lucide-react"

interface SpaceObjectsMapProps {
  dataset: string
}

export function SpaceObjectsMap({ dataset }: SpaceObjectsMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [zoom, setZoom] = useState([50])
  const [rotation, setRotation] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Sample data - in a real app, this would come from an API based on the dataset
  const spaceObjects =
    dataset === "exoplanets"
      ? [
          { name: "Kepler-186f", x: 150, y: 120, radius: 5, color: "#FF5733" },
          { name: "Kepler-442b", x: 220, y: 180, radius: 6, color: "#33FF57" },
          { name: "Kepler-62f", x: 300, y: 250, radius: 7, color: "#3357FF" },
          { name: "Kepler-452b", x: 400, y: 150, radius: 8, color: "#F3FF33" },
          { name: "Proxima Centauri b", x: 180, y: 300, radius: 5, color: "#FF33F3" },
          { name: "TRAPPIST-1e", x: 250, y: 350, radius: 4, color: "#33FFF3" },
        ]
      : [
          { name: "Güneş", x: 250, y: 200, radius: 15, color: "#FFCC33" },
          { name: "Sirius", x: 350, y: 150, radius: 10, color: "#FFFFFF" },
          { name: "Alpha Centauri A", x: 150, y: 250, radius: 8, color: "#FFCC33" },
          { name: "Vega", x: 400, y: 300, radius: 9, color: "#FFFFFF" },
          { name: "Betelgeuse", x: 200, y: 100, radius: 12, color: "#FF3333" },
        ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set background
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw stars in background
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 1.5
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, " + Math.random() * 0.8 + ")"
      ctx.fill()
    }

    // Save context for rotation
    ctx.save()

    // Translate to center for rotation
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotation * Math.PI) / 180)

    // Apply zoom
    const zoomFactor = zoom[0] / 50
    ctx.scale(zoomFactor, zoomFactor)

    // Translate back
    ctx.translate(-canvas.width / 2, -canvas.height / 2)

    // Draw space objects
    spaceObjects.forEach((obj) => {
      // Draw object
      ctx.beginPath()
      ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2)
      ctx.fillStyle = obj.color
      ctx.fill()

      // Draw glow effect
      const gradient = ctx.createRadialGradient(obj.x, obj.y, obj.radius, obj.x, obj.y, obj.radius * 2)
      gradient.addColorStop(0, obj.color)
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.beginPath()
      ctx.arc(obj.x, obj.y, obj.radius * 2, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw name
      ctx.font = "12px Arial"
      ctx.fillStyle = "#fff"
      ctx.textAlign = "center"
      ctx.fillText(obj.name, obj.x, obj.y + obj.radius + 15)
    })

    // Restore context
    ctx.restore()
  }, [spaceObjects, zoom, rotation, dataset])

  const toggleFullscreen = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (!isFullscreen) {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }

    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">{dataset === "exoplanets" ? "Dış Gezegen Haritası" : "Yıldız Haritası"}</h2>
      </div>

      <Card className="bg-slate-950 border-slate-800 text-white">
        <CardHeader>
          <CardTitle>{dataset === "exoplanets" ? "Dış Gezegen Konumları" : "Yıldız Konumları"}</CardTitle>
          <CardDescription className="text-slate-400">
            {dataset === "exoplanets"
              ? "Keşfedilen dış gezegenlerin göreceli konumları"
              : "Yakın yıldızların göreceli konumları"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <canvas ref={canvasRef} width={800} height={500} className="w-full h-[500px] rounded-md" />

            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm p-3 rounded-md flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <ZoomOut className="w-4 h-4 text-slate-400" />
                <Slider
                  defaultValue={[50]}
                  max={100}
                  min={10}
                  step={1}
                  value={zoom}
                  onValueChange={setZoom}
                  className="w-24 sm:w-32"
                />
                <ZoomIn className="w-4 h-4 text-slate-400" />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-slate-700 bg-black/50"
                  onClick={() => setRotation(rotation - 15)}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-slate-700 bg-black/50"
                  onClick={() => setRotation(rotation + 15)}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-slate-700 bg-black/50"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </Button>
              </div>

              <div className="text-xs text-slate-400 ml-auto">
                {dataset === "exoplanets"
                  ? "Not: Konumlar ölçekli değildir, gösterim amaçlıdır."
                  : "Not: Konumlar ölçekli değildir, gösterim amaçlıdır."}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
