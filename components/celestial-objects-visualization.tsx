"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Maximize2,
  Minimize2,
  Info,
  Layers,
  Eye,
  EyeOff,
  RefreshCw,
  Share2,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface CelestialObjectsVisualizationProps {
  dataset: string
}

export function CelestialObjectsVisualization({ dataset }: CelestialObjectsVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [zoom, setZoom] = useState([50])
  const [rotation, setRotation] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [viewMode, setViewMode] = useState("2d")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedObject, setSelectedObject] = useState<string | null>(null)
  const [showLabels, setShowLabels] = useState(true)
  const [showOrbits, setShowOrbits] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState([50])
  const [isPlaying, setIsPlaying] = useState(true)

  // Sample data - in a real app, this would come from an API based on the dataset
  const spaceObjects =
    dataset === "exoplanets"
      ? [
          {
            id: "kepler-186f",
            name: "Kepler-186f",
            x: 150,
            y: 120,
            z: 30,
            radius: 5,
            color: "#4f46e5",
            orbit: 180,
            speed: 0.5,
            type: "Super-Earth",
          },
          {
            id: "kepler-442b",
            name: "Kepler-442b",
            x: 220,
            y: 180,
            z: -20,
            radius: 6,
            color: "#8b5cf6",
            orbit: 240,
            speed: 0.4,
            type: "Super-Earth",
          },
          {
            id: "kepler-62f",
            name: "Kepler-62f",
            x: 300,
            y: 250,
            z: 10,
            radius: 7,
            color: "#6366f1",
            orbit: 320,
            speed: 0.3,
            type: "Super-Earth",
          },
          {
            id: "kepler-452b",
            name: "Kepler-452b",
            x: 400,
            y: 150,
            z: -40,
            radius: 8,
            color: "#a855f7",
            orbit: 380,
            speed: 0.25,
            type: "Super-Earth",
          },
          {
            id: "proxima-centauri-b",
            name: "Proxima Centauri b",
            x: 180,
            y: 300,
            z: 50,
            radius: 5,
            color: "#ec4899",
            orbit: 200,
            speed: 0.6,
            type: "Earth-like",
          },
          {
            id: "trappist-1e",
            name: "TRAPPIST-1e",
            x: 250,
            y: 350,
            z: -10,
            radius: 4,
            color: "#d946ef",
            orbit: 280,
            speed: 0.55,
            type: "Earth-like",
          },
          {
            id: "trappist-1f",
            name: "TRAPPIST-1f",
            x: 320,
            y: 280,
            z: 30,
            radius: 4.5,
            color: "#f97316",
            orbit: 310,
            speed: 0.5,
            type: "Earth-like",
          },
          {
            id: "toi-700d",
            name: "TOI-700 d",
            x: 380,
            y: 220,
            z: -25,
            radius: 5.5,
            color: "#14b8a6",
            orbit: 350,
            speed: 0.45,
            type: "Earth-like",
          },
          {
            id: "k2-18b",
            name: "K2-18b",
            x: 420,
            y: 320,
            z: 15,
            radius: 9,
            color: "#0ea5e9",
            orbit: 400,
            speed: 0.35,
            type: "Mini-Neptune",
          },
          {
            id: "hd-40307g",
            name: "HD 40307 g",
            x: 200,
            y: 200,
            z: -35,
            radius: 7,
            color: "#8b5cf6",
            orbit: 230,
            speed: 0.4,
            type: "Super-Earth",
          },
        ]
      : dataset === "stars"
        ? [
            {
              id: "sun",
              name: "Güneş",
              x: 250,
              y: 200,
              z: 0,
              radius: 15,
              color: "#fbbf24",
              orbit: 0,
              speed: 0,
              type: "G-type",
            },
            {
              id: "sirius",
              name: "Sirius",
              x: 350,
              y: 150,
              z: 30,
              radius: 10,
              color: "#f9fafb",
              orbit: 0,
              speed: 0,
              type: "A-type",
            },
            {
              id: "alpha-centauri-a",
              name: "Alpha Centauri A",
              x: 150,
              y: 250,
              z: -20,
              radius: 8,
              color: "#fbbf24",
              orbit: 0,
              speed: 0,
              type: "G-type",
            },
            {
              id: "alpha-centauri-b",
              name: "Alpha Centauri B",
              x: 170,
              y: 270,
              z: -25,
              radius: 7,
              color: "#fb923c",
              orbit: 0,
              speed: 0,
              type: "K-type",
            },
            {
              id: "proxima-centauri",
              name: "Proxima Centauri",
              x: 190,
              y: 290,
              z: -30,
              radius: 3,
              color: "#ef4444",
              orbit: 0,
              speed: 0,
              type: "M-type",
            },
            {
              id: "vega",
              name: "Vega",
              x: 400,
              y: 300,
              z: 40,
              radius: 9,
              color: "#f9fafb",
              orbit: 0,
              speed: 0,
              type: "A-type",
            },
            {
              id: "betelgeuse",
              name: "Betelgeuse",
              x: 200,
              y: 100,
              z: -10,
              radius: 12,
              color: "#ef4444",
              orbit: 0,
              speed: 0,
              type: "M-type",
            },
            {
              id: "rigel",
              name: "Rigel",
              x: 300,
              y: 350,
              z: 20,
              radius: 11,
              color: "#93c5fd",
              orbit: 0,
              speed: 0,
              type: "B-type",
            },
            {
              id: "arcturus",
              name: "Arcturus",
              x: 100,
              y: 200,
              z: 10,
              radius: 10,
              color: "#fb923c",
              orbit: 0,
              speed: 0,
              type: "K-type",
            },
            {
              id: "aldebaran",
              name: "Aldebaran",
              x: 150,
              y: 150,
              z: -15,
              radius: 9,
              color: "#fb923c",
              orbit: 0,
              speed: 0,
              type: "K-type",
            },
          ]
        : [
            {
              id: "milky-way",
              name: "Samanyolu",
              x: 250,
              y: 200,
              z: 0,
              radius: 20,
              color: "#8b5cf6",
              orbit: 0,
              speed: 0,
              type: "Spiral",
            },
            {
              id: "andromeda",
              name: "Andromeda",
              x: 400,
              y: 250,
              z: 30,
              radius: 22,
              color: "#6366f1",
              orbit: 0,
              speed: 0,
              type: "Spiral",
            },
            {
              id: "triangulum",
              name: "Üçgen",
              x: 150,
              y: 300,
              z: -20,
              radius: 15,
              color: "#14b8a6",
              orbit: 0,
              speed: 0,
              type: "Spiral",
            },
            {
              id: "large-magellanic-cloud",
              name: "Büyük Macellan Bulutu",
              x: 350,
              y: 350,
              z: 10,
              radius: 12,
              color: "#0ea5e9",
              orbit: 0,
              speed: 0,
              type: "Irregular",
            },
            {
              id: "small-magellanic-cloud",
              name: "Küçük Macellan Bulutu",
              x: 380,
              y: 380,
              z: 15,
              radius: 10,
              color: "#8b5cf6",
              orbit: 0,
              speed: 0,
              type: "Irregular",
            },
            {
              id: "messier-87",
              name: "Messier 87",
              x: 200,
              y: 150,
              z: -25,
              radius: 18,
              color: "#f43f5e",
              orbit: 0,
              speed: 0,
              type: "Elliptical",
            },
            {
              id: "messier-81",
              name: "Messier 81",
              x: 300,
              y: 100,
              z: 20,
              radius: 16,
              color: "#f59e0b",
              orbit: 0,
              speed: 0,
              type: "Spiral",
            },
            {
              id: "sombrero",
              name: "Sombrero",
              x: 100,
              y: 250,
              z: -15,
              radius: 14,
              color: "#f97316",
              orbit: 0,
              speed: 0,
              type: "Spiral",
            },
            {
              id: "whirlpool",
              name: "Girdap",
              x: 150,
              y: 350,
              z: 25,
              radius: 15,
              color: "#4f46e5",
              orbit: 0,
              speed: 0,
              type: "Spiral",
            },
            {
              id: "cartwheel",
              name: "Tekerlek",
              x: 400,
              y: 150,
              z: -10,
              radius: 17,
              color: "#a855f7",
              orbit: 0,
              speed: 0,
              type: "Ring",
            },
          ]

  // Animation frame reference
  const animationRef = useRef<number>()
  const angleRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Animation function
    const animate = () => {
      if (!isPlaying) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

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

      // Sort objects by z-index for pseudo-3D effect if in 3D mode
      const sortedObjects = [...spaceObjects]
      if (viewMode === "3d") {
        sortedObjects.sort((a, b) => a.z - b.z)
      }

      // Draw orbits first if enabled
      if (showOrbits && dataset === "exoplanets") {
        sortedObjects.forEach((obj) => {
          if (obj.orbit > 0) {
            ctx.beginPath()
            ctx.ellipse(canvas.width / 2, canvas.height / 2, obj.orbit, obj.orbit * 0.6, 0, 0, Math.PI * 2)
            ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
            ctx.setLineDash([5, 5])
            ctx.stroke()
            ctx.setLineDash([])
          }
        })
      }

      // Update angle for animation
      angleRef.current += 0.01 * (animationSpeed[0] / 50)
      if (angleRef.current > Math.PI * 2) angleRef.current = 0

      // Draw space objects
      sortedObjects.forEach((obj) => {
        let objX = obj.x
        let objY = obj.y

        // Calculate position based on orbit if applicable
        if (dataset === "exoplanets" && obj.orbit > 0) {
          objX = canvas.width / 2 + Math.cos(angleRef.current * obj.speed) * obj.orbit
          objY = canvas.height / 2 + Math.sin(angleRef.current * obj.speed) * obj.orbit * 0.6
        }

        // Calculate size based on z-position if in 3D mode
        let adjustedRadius = obj.radius
        if (viewMode === "3d") {
          // Scale based on z position (further objects appear smaller)
          const zScale = (obj.z + 50) / 100 // Normalize z from -50 to 50 to a scale factor
          adjustedRadius = obj.radius * (0.5 + zScale)
        }

        // Draw object
        ctx.beginPath()
        ctx.arc(objX, objY, adjustedRadius, 0, Math.PI * 2)
        ctx.fillStyle = obj.color

        // Highlight selected object
        if (selectedObject === obj.id) {
          ctx.shadowColor = obj.color
          ctx.shadowBlur = 15
        } else {
          ctx.shadowBlur = 0
        }

        ctx.fill()
        ctx.shadowBlur = 0

        // Draw glow effect
        const gradient = ctx.createRadialGradient(objX, objY, adjustedRadius, objX, objY, adjustedRadius * 2)
        gradient.addColorStop(0, obj.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.beginPath()
        ctx.arc(objX, objY, adjustedRadius * 2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw name if labels are enabled
        if (showLabels) {
          ctx.font = "12px Arial"
          ctx.fillStyle = "#fff"
          ctx.textAlign = "center"
          ctx.fillText(obj.name, objX, objY + adjustedRadius + 15)
        }
      })

      // Restore context
      ctx.restore()

      // Continue animation
      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [
    spaceObjects,
    zoom,
    rotation,
    dataset,
    viewMode,
    selectedObject,
    showLabels,
    showOrbits,
    animationSpeed,
    isPlaying,
  ])

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

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  const handleObjectSelect = (id: string) => {
    setSelectedObject(id === selectedObject ? null : id)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            {dataset === "exoplanets"
              ? "Dış Gezegen Görselleştirmesi"
              : dataset === "stars"
                ? "Yıldız Görselleştirmesi"
                : "Galaksi Görselleştirmesi"}
          </h2>
          <p className="text-slate-400 text-sm">
            {dataset === "exoplanets"
              ? "Keşfedilen dış gezegenlerin interaktif 3 boyutlu görselleştirmesi"
              : dataset === "stars"
                ? "Yakın ve uzak yıldızların interaktif 3 boyutlu görselleştirmesi"
                : "Gözlemlenebilir galaksilerin interaktif 3 boyutlu görselleştirmesi"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Tabs value={viewMode} onValueChange={setViewMode} className="w-[180px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="2d">2D Görünüm</TabsTrigger>
              <TabsTrigger value="3d">3D Görünüm</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="col-span-1 lg:col-span-3 bg-slate-950 border-slate-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg font-medium">
                {dataset === "exoplanets"
                  ? "Dış Gezegen Haritası"
                  : dataset === "stars"
                    ? "Yıldız Haritası"
                    : "Galaksi Haritası"}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {dataset === "exoplanets"
                  ? "Keşfedilen dış gezegenlerin göreceli konumları"
                  : dataset === "stars"
                    ? "Yakın yıldızların göreceli konumları"
                    : "Yakın galaksilerin göreceli konumları"}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8 border-slate-800" onClick={handleRefresh}>
                      <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Yenile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8 border-slate-800">
                    <Layers className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 bg-slate-950 border-slate-800 text-white p-3">
                  <div className="space-y-3">
                    <h4 className="font-medium">Görünüm Ayarları</h4>
                    <Separator className="bg-slate-800" />
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Etiketleri Göster</label>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setShowLabels(!showLabels)}
                      >
                        {showLabels ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Yörüngeleri Göster</label>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setShowOrbits(!showOrbits)}
                      >
                        {showOrbits ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-slate-800"
                      onClick={toggleFullscreen}
                    >
                      {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <Separator className="bg-slate-800" />
          <CardContent className="p-0">
            <div className="relative">
              <canvas ref={canvasRef} width={800} height={600} className="w-full h-[600px]" />

              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm p-3 rounded-md flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-slate-700 bg-black/50"
                    onClick={() => setZoom([Math.max(10, zoom[0] - 10)])}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Slider
                    defaultValue={[50]}
                    max={100}
                    min={10}
                    step={1}
                    value={zoom}
                    onValueChange={setZoom}
                    className="w-24 sm:w-32"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-slate-700 bg-black/50"
                    onClick={() => setZoom([Math.min(100, zoom[0] + 10)])}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
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
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={isPlaying ? "default" : "outline"}
                    size="sm"
                    className={!isPlaying ? "border-slate-700 bg-black/50" : ""}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? "Durdur" : "Oynat"}
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Hız:</span>
                    <Slider
                      defaultValue={[50]}
                      max={100}
                      min={10}
                      step={1}
                      value={animationSpeed}
                      onValueChange={setAnimationSpeed}
                      className="w-24"
                    />
                  </div>
                </div>

                <div className="text-xs text-slate-400 ml-auto">
                  {dataset === "exoplanets"
                    ? "Not: Konumlar ve boyutlar ölçekli değildir, gösterim amaçlıdır."
                    : "Not: Konumlar ve boyutlar ölçekli değildir, gösterim amaçlıdır."}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-slate-950 border-slate-800 text-white">
            <CardHeader>
              <CardTitle>Nesne Detayları</CardTitle>
              <CardDescription className="text-slate-400">
                {selectedObject
                  ? `${spaceObjects.find((obj) => obj.id === selectedObject)?.name} detayları`
                  : "Detayları görmek için bir nesne seçin"}
              </CardDescription>
            </CardHeader>
            <Separator className="bg-slate-800" />
            <CardContent className="pt-6">
              {selectedObject ? (
                <div className="space-y-4">
                  {(() => {
                    const obj = spaceObjects.find((obj) => obj.id === selectedObject)
                    if (!obj) return null

                    return (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full" style={{ backgroundColor: obj.color }}></div>
                          <div>
                            <h3 className="font-medium">{obj.name}</h3>
                            <p className="text-sm text-slate-400">{obj.type}</p>
                          </div>
                        </div>

                        <Separator className="bg-slate-800" />

                        {dataset === "exoplanets" ? (
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-slate-400">Yarıçap</p>
                                <p className="font-medium">{obj.radius} R⊕</p>
                              </div>
                              <div>
                                <p className="text-slate-400">Yörünge</p>
                                <p className="font-medium">{obj.orbit} milyon km</p>
                              </div>
                              <div>
                                <p className="text-slate-400">Tür</p>
                                <p className="font-medium">{obj.type}</p>
                              </div>
                              <div>
                                <p className="text-slate-400">Yörünge Hızı</p>
                                <p className="font-medium">{obj.speed * 30} km/s</p>
                              </div>
                            </div>

                            <div className="pt-2">
                              <p className="text-slate-400 text-sm mb-1">Yaşanabilirlik Potansiyeli</p>
                              <div className="w-full bg-slate-800 rounded-full h-2.5">
                                <div
                                  className="bg-indigo-600 h-2.5 rounded-full"
                                  style={{ width: `${(obj.radius / 10) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ) : dataset === "stars" ? (
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-slate-400">Yarıçap</p>
                                <p className="font-medium">{obj.radius} R☉</p>
                              </div>
                              <div>
                                <p className="text-slate-400">Tür</p>
                                <p className="font-medium">{obj.type}</p>
                              </div>
                              <div>
                                <p className="text-slate-400">Sıcaklık</p>
                                <p className="font-medium">{5000 + Math.floor(obj.radius * 500)} K</p>
                              </div>
                              <div>
                                <p className="text-slate-400">Yaş</p>
                                <p className="font-medium">{(obj.radius * 0.5).toFixed(1)} milyar yıl</p>
                              </div>
                            </div>

                            <div className="pt-2">
                              <p className="text-slate-400 text-sm mb-1">Parlaklık (Güneş = 1)</p>
                              <div className="w-full bg-slate-800 rounded-full h-2.5">
                                <div
                                  className="bg-indigo-600 h-2.5 rounded-full"
                                  style={{ width: `${(obj.radius / 15) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-slate-400">Çap</p>
                                <p className="font-medium">{obj.radius * 5} bin ışık yılı</p>
                              </div>
                              <div>
                                <p className="text-slate-400">Tür</p>
                                <p className="font-medium">{obj.type}</p>
                              </div>
                              <div>
                                <p className="text-slate-400">Yaş</p>
                                <p className="font-medium">{(obj.radius * 0.7).toFixed(1)} milyar yıl</p>
                              </div>
                              <div>
                                <p className="text-slate-400">Uzaklık</p>
                                <p className="font-medium">{obj.radius * 1.5} milyon ışık yılı</p>
                              </div>
                            </div>

                            <div className="pt-2">
                              <p className="text-slate-400 text-sm mb-1">Tahmini Yıldız Sayısı</p>
                              <div className="w-full bg-slate-800 rounded-full h-2.5">
                                <div
                                  className="bg-indigo-600 h-2.5 rounded-full"
                                  style={{ width: `${(obj.radius / 22) * 100}%` }}
                                ></div>
                              </div>
                              <p className="text-right text-xs text-slate-500 mt-1">
                                ~{(obj.radius * 50).toFixed(0)} milyar
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between pt-2">
                          <Button variant="outline" size="sm" className="border-slate-800 bg-slate-900">
                            <Info className="mr-2 h-4 w-4" />
                            Detaylı Bilgi
                          </Button>
                          <Button variant="outline" size="sm" className="border-slate-800 bg-slate-900">
                            <Share2 className="mr-2 h-4 w-4" />
                            Paylaş
                          </Button>
                        </div>
                      </>
                    )
                  })()}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-400">
                  <Layers className="h-10 w-10 mx-auto mb-3 text-slate-600" />
                  <p>Detayları görmek için haritadan bir nesne seçin</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-950 border-slate-800 text-white">
            <CardHeader>
              <CardTitle>Nesne Listesi</CardTitle>
              <CardDescription className="text-slate-400">Görselleştirmedeki tüm nesneler</CardDescription>
            </CardHeader>
            <Separator className="bg-slate-800" />
            <CardContent className="pt-6">
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {spaceObjects.map((obj) => (
                  <div
                    key={obj.id}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                      selectedObject === obj.id ? "bg-slate-800" : "hover:bg-slate-900"
                    }`}
                    onClick={() => handleObjectSelect(obj.id)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: obj.color }}></div>
                      <span>{obj.name}</span>
                    </div>
                    <Badge variant="outline" className="bg-slate-900 text-xs">
                      {obj.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
