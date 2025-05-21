"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ZAxis,
  Sector,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Download,
  BarChart3,
  LineChartIcon,
  PieChartIcon,
  ScatterChartIcon,
  RadarIcon,
  Share2,
  Maximize2,
  Filter,
  RefreshCw,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

interface DataVisualizationPanelProps {
  dataset: string
}

export function DataVisualizationPanel({ dataset }: DataVisualizationPanelProps) {
  const [chartType, setChartType] = useState("scatter")
  const [dataView, setDataView] = useState("visual")
  const [zoomLevel, setZoomLevel] = useState([50])
  const [isLoading, setIsLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  // Enhanced data with more realistic values and properties
  const exoplanetData = [
    {
      id: "KOI-7923.01",
      name: "Kepler-186f",
      distance: 492,
      radius: 1.17,
      mass: 1.3,
      temperature: 188,
      habitability: 0.82,
      atmosphere: 0.7,
      water: 0.65,
      discoveryYear: 2014,
      color: "#4f46e5",
    },
    {
      id: "KOI-4742.01",
      name: "Kepler-442b",
      distance: 1206,
      radius: 1.34,
      mass: 2.3,
      temperature: 233,
      habitability: 0.84,
      atmosphere: 0.8,
      water: 0.7,
      discoveryYear: 2015,
      color: "#8b5cf6",
    },
    {
      id: "KOI-701.04",
      name: "Kepler-62f",
      distance: 1200,
      radius: 1.41,
      mass: 2.8,
      temperature: 208,
      habitability: 0.67,
      atmosphere: 0.6,
      water: 0.8,
      discoveryYear: 2013,
      color: "#6366f1",
    },
    {
      id: "KOI-7016.01",
      name: "Kepler-452b",
      distance: 1402,
      radius: 1.63,
      mass: 5,
      temperature: 265,
      habitability: 0.93,
      atmosphere: 0.85,
      water: 0.75,
      discoveryYear: 2015,
      color: "#a855f7",
    },
    {
      id: "HIP-113357",
      name: "Proxima Centauri b",
      distance: 4.2,
      radius: 1.08,
      mass: 1.27,
      temperature: 234,
      habitability: 0.87,
      atmosphere: 0.4,
      water: 0.3,
      discoveryYear: 2016,
      color: "#ec4899",
    },
    {
      id: "2MASS-J23062928-0502285",
      name: "TRAPPIST-1e",
      distance: 39,
      radius: 0.92,
      mass: 0.77,
      temperature: 251,
      habitability: 0.95,
      atmosphere: 0.9,
      water: 0.85,
      discoveryYear: 2017,
      color: "#d946ef",
    },
    {
      id: "2MASS-J23062928-0502285f",
      name: "TRAPPIST-1f",
      distance: 39,
      radius: 1.04,
      mass: 0.93,
      temperature: 219,
      habitability: 0.68,
      atmosphere: 0.75,
      water: 0.9,
      discoveryYear: 2017,
      color: "#f97316",
    },
    {
      id: "TIC-150618248",
      name: "TOI-700 d",
      distance: 101,
      radius: 1.19,
      mass: 1.72,
      temperature: 268,
      habitability: 0.71,
      atmosphere: 0.65,
      water: 0.6,
      discoveryYear: 2020,
      color: "#14b8a6",
    },
    {
      id: "EPIC-201912552",
      name: "K2-18b",
      distance: 124,
      radius: 2.6,
      mass: 8.63,
      temperature: 265,
      habitability: 0.73,
      atmosphere: 0.95,
      water: 0.9,
      discoveryYear: 2015,
      color: "#0ea5e9",
    },
    {
      id: "HD-40307g",
      name: "HD 40307 g",
      distance: 42,
      radius: 1.8,
      mass: 7.1,
      temperature: 240,
      habitability: 0.79,
      atmosphere: 0.7,
      water: 0.65,
      discoveryYear: 2012,
      color: "#8b5cf6",
    },
    {
      id: "HD-85512b",
      name: "Gliese 581g",
      distance: 20.5,
      radius: 1.5,
      mass: 3.1,
      temperature: 228,
      habitability: 0.82,
      atmosphere: 0.75,
      water: 0.7,
      discoveryYear: 2010,
      color: "#f43f5e",
    },
    {
      id: "HD-219134b",
      name: "HD 219134 b",
      distance: 21,
      radius: 1.6,
      mass: 4.5,
      temperature: 700,
      habitability: 0.1,
      atmosphere: 0.3,
      water: 0.05,
      discoveryYear: 2015,
      color: "#f59e0b",
    },
  ]

  const starData = [
    {
      id: "SOL",
      name: "Güneş",
      type: "G2V",
      mass: 1,
      radius: 1,
      luminosity: 1,
      temperature: 5778,
      age: 4.6,
      distance: 0,
      planets: 8,
      color: "#fbbf24",
    },
    {
      id: "SIRIUS",
      name: "Sirius",
      type: "A1V",
      mass: 2.02,
      radius: 1.71,
      luminosity: 25.4,
      temperature: 9940,
      age: 0.242,
      distance: 8.6,
      planets: 0,
      color: "#f9fafb",
    },
    {
      id: "ALPHA-CENTAURI-A",
      name: "Alpha Centauri A",
      type: "G2V",
      mass: 1.1,
      radius: 1.22,
      luminosity: 1.519,
      temperature: 5790,
      age: 5.3,
      distance: 4.37,
      planets: 0,
      color: "#fbbf24",
    },
    {
      id: "ALPHA-CENTAURI-B",
      name: "Alpha Centauri B",
      type: "K1V",
      mass: 0.907,
      radius: 0.865,
      luminosity: 0.5,
      temperature: 5260,
      age: 5.3,
      distance: 4.37,
      planets: 1,
      color: "#fb923c",
    },
    {
      id: "PROXIMA-CENTAURI",
      name: "Proxima Centauri",
      type: "M5.5Ve",
      mass: 0.122,
      radius: 0.154,
      luminosity: 0.0017,
      temperature: 3042,
      age: 4.85,
      distance: 4.25,
      planets: 3,
      color: "#ef4444",
    },
    {
      id: "VEGA",
      name: "Vega",
      type: "A0Va",
      mass: 2.135,
      radius: 2.362,
      luminosity: 40.12,
      temperature: 9602,
      age: 0.455,
      distance: 25.04,
      planets: 0,
      color: "#f9fafb",
    },
    {
      id: "BETELGEUSE",
      name: "Betelgeuse",
      type: "M1-2Ia-Iab",
      mass: 11.6,
      radius: 887,
      luminosity: 126000,
      temperature: 3500,
      age: 0.0086,
      distance: 548,
      planets: 0,
      color: "#ef4444",
    },
    {
      id: "RIGEL",
      name: "Rigel",
      type: "B8Ia",
      mass: 21,
      radius: 78.9,
      luminosity: 120000,
      temperature: 12100,
      age: 0.008,
      distance: 860,
      planets: 0,
      color: "#93c5fd",
    },
    {
      id: "ARCTURUS",
      name: "Arcturus",
      type: "K0III",
      mass: 1.08,
      radius: 25.4,
      luminosity: 170,
      temperature: 4286,
      age: 7.1,
      distance: 36.7,
      planets: 0,
      color: "#fb923c",
    },
    {
      id: "ALDEBARAN",
      name: "Aldebaran",
      type: "K5III",
      mass: 1.16,
      radius: 44.2,
      luminosity: 518,
      temperature: 3910,
      age: 6.4,
      distance: 65.3,
      planets: 1,
      color: "#fb923c",
    },
    {
      id: "ANTARES",
      name: "Antares",
      type: "M1.5Iab-Ib",
      mass: 12,
      radius: 680,
      luminosity: 75900,
      temperature: 3660,
      age: 0.015,
      distance: 550,
      planets: 0,
      color: "#ef4444",
    },
    {
      id: "FOMALHAUT",
      name: "Fomalhaut",
      type: "A3V",
      mass: 1.92,
      radius: 1.842,
      luminosity: 16.63,
      temperature: 8590,
      age: 0.44,
      distance: 25.13,
      planets: 1,
      color: "#f9fafb",
    },
  ]

  const galaxyData = [
    {
      id: "MILKY-WAY",
      name: "Samanyolu",
      type: "SBbc",
      diameter: 100000,
      mass: 1.5e12,
      stars: 400e9,
      age: 13.6,
      distance: 0,
      redshift: 0,
      color: "#8b5cf6",
    },
    {
      id: "ANDROMEDA",
      name: "Andromeda",
      type: "SA(s)b",
      diameter: 220000,
      mass: 1.5e12,
      stars: 1e12,
      age: 10.01,
      distance: 2.537e6,
      redshift: 0.001001,
      color: "#6366f1",
    },
    {
      id: "TRIANGULUM",
      name: "Üçgen",
      type: "SAc",
      diameter: 60000,
      mass: 5e10,
      stars: 40e9,
      age: 13,
      distance: 2.73e6,
      redshift: 0.000804,
      color: "#14b8a6",
    },
    {
      id: "LARGE-MAGELLANIC-CLOUD",
      name: "Büyük Macellan Bulutu",
      type: "SB(s)m",
      diameter: 14000,
      mass: 1e10,
      stars: 30e9,
      age: 1.1,
      distance: 158200,
      redshift: 0.000926,
      color: "#0ea5e9",
    },
    {
      id: "SMALL-MAGELLANIC-CLOUD",
      name: "Küçük Macellan Bulutu",
      type: "SB(s)m pec",
      diameter: 7000,
      mass: 7e9,
      stars: 3e9,
      age: 6.5,
      distance: 199000,
      redshift: 0.000527,
      color: "#8b5cf6",
    },
    {
      id: "MESSIER-87",
      name: "Messier 87",
      type: "E0-1",
      diameter: 120000,
      mass: 2.4e12,
      stars: 1e12,
      age: 13.24,
      distance: 16.4e6,
      redshift: 0.00428,
      color: "#f43f5e",
    },
    {
      id: "MESSIER-81",
      name: "Messier 81",
      type: "SA(s)ab",
      diameter: 90000,
      mass: 3.0e11,
      stars: 250e9,
      age: 13.31,
      distance: 11.8e6,
      redshift: 0.000113,
      color: "#f59e0b",
    },
    {
      id: "MESSIER-82",
      name: "Messier 82",
      type: "I0",
      diameter: 37000,
      mass: 1.0e11,
      stars: 30e9,
      age: 13.3,
      distance: 11.4e6,
      redshift: 0.000677,
      color: "#ec4899",
    },
    {
      id: "NGC-1300",
      name: "NGC 1300",
      type: "SB(rs)bc",
      diameter: 110000,
      mass: 1.9e11,
      stars: 150e9,
      age: 5,
      distance: 61.3e6,
      redshift: 0.0058,
      color: "#d946ef",
    },
    {
      id: "SOMBRERO",
      name: "Sombrero",
      type: "SA(s)a",
      diameter: 50000,
      mass: 8.0e11,
      stars: 100e9,
      age: 13.25,
      distance: 29.3e6,
      redshift: 0.00342,
      color: "#f97316",
    },
    {
      id: "WHIRLPOOL",
      name: "Girdap",
      type: "SA(s)bc pec",
      diameter: 60000,
      mass: 1.6e11,
      stars: 100e9,
      age: 0.4,
      distance: 23.5e6,
      redshift: 0.001544,
      color: "#4f46e5",
    },
    {
      id: "CARTWHEEL",
      name: "Tekerlek",
      type: "S pec",
      diameter: 150000,
      mass: 4.0e11,
      stars: 100e9,
      age: 0.2,
      distance: 500e6,
      redshift: 0.03,
      color: "#a855f7",
    },
  ]

  // Select the appropriate data based on the dataset prop
  const data = dataset === "stars" ? starData : dataset === "galaxies" ? galaxyData : exoplanetData

  // Function to render active shape for pie chart
  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? "start" : "end"

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#999">{`${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    )
  }

  // Function to handle refresh data
  const handleRefreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  // Function to handle chart type change
  const handleChartTypeChange = (type: string) => {
    setIsLoading(true)
    setChartType(type)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  // Function to handle pie chart sector click
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  // Get the appropriate data keys based on dataset
  const getDataKeys = () => {
    if (dataset === "exoplanets") {
      return {
        xKey: "distance",
        yKey: "radius",
        zKey: "temperature",
        xLabel: "Mesafe (ışık yılı)",
        yLabel: "Yarıçap (Dünya yarıçapı)",
        zLabel: "Sıcaklık (K)",
        radarKeys: ["habitability", "atmosphere", "water"],
        radarLabels: ["Yaşanabilirlik", "Atmosfer", "Su"],
      }
    } else if (dataset === "stars") {
      return {
        xKey: "mass",
        yKey: "luminosity",
        zKey: "temperature",
        xLabel: "Kütle (Güneş kütlesi)",
        yLabel: "Parlaklık (Güneş parlaklığı)",
        zLabel: "Sıcaklık (K)",
        radarKeys: ["mass", "luminosity", "age"],
        radarLabels: ["Kütle", "Parlaklık", "Yaş"],
      }
    } else {
      return {
        xKey: "mass",
        yKey: "diameter",
        zKey: "age",
        xLabel: "Kütle (10^12 Güneş kütlesi)",
        yLabel: "Çap (bin ışık yılı)",
        zLabel: "Yaş (milyar yıl)",
        radarKeys: ["mass", "stars", "age"],
        radarLabels: ["Kütle", "Yıldız Sayısı", "Yaş"],
      }
    }
  }

  const dataKeys = getDataKeys()

  // Normalize data for radar chart
  const normalizeDataForRadar = (data: any[]) => {
    return data.map((item) => {
      const normalizedItem: any = { name: item.name }

      dataKeys.radarKeys.forEach((key) => {
        // Find max value for normalization
        const maxValue = Math.max(...data.map((d) => d[key]))
        normalizedItem[key] = item[key] / maxValue
      })

      return normalizedItem
    })
  }

  const normalizedData = normalizeDataForRadar(data)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            {dataset === "exoplanets"
              ? "Dış Gezegen Verileri"
              : dataset === "stars"
                ? "Yıldız Verileri"
                : "Galaksi Verileri"}
          </h2>
          <p className="text-slate-400 text-sm">
            {dataset === "exoplanets"
              ? "Keşfedilen dış gezegenlerin fiziksel özellikleri ve yaşanabilirlik potansiyelleri"
              : dataset === "stars"
                ? "Yakın ve uzak yıldızların fiziksel özellikleri ve sınıflandırmaları"
                : "Gözlemlenebilir galaksilerin yapısal özellikleri ve dağılımları"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Tabs value={dataView} onValueChange={setDataView} className="w-[240px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="visual">Görsel</TabsTrigger>
              <TabsTrigger value="data">Veri</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <TabsContent value="visual" className="mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2 bg-slate-950 border-slate-800 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg font-medium">
                  {chartType === "scatter"
                    ? "Dağılım Grafiği"
                    : chartType === "bar"
                      ? "Çubuk Grafik"
                      : chartType === "line"
                        ? "Çizgi Grafik"
                        : chartType === "radar"
                          ? "Radar Grafiği"
                          : "Pasta Grafik"}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {dataset === "exoplanets"
                    ? "Dış gezegenlerin fiziksel özellikleri arasındaki ilişki"
                    : dataset === "stars"
                      ? "Yıldızların fiziksel özellikleri arasındaki ilişki"
                      : "Galaksilerin fiziksel özellikleri arasındaki ilişki"}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8 border-slate-800">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Veri Filtrele</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-slate-800"
                        onClick={handleRefreshData}
                      >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Verileri Yenile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8 border-slate-800">
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tam Ekran</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <Separator className="bg-slate-800" />
            <CardContent className="pt-6">
              <div className="mb-4 flex flex-wrap gap-2">
                <Button
                  variant={chartType === "scatter" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleChartTypeChange("scatter")}
                  className={chartType !== "scatter" ? "border-slate-800 bg-slate-900" : ""}
                >
                  <ScatterChartIcon className="mr-2 h-4 w-4" />
                  Dağılım
                </Button>
                <Button
                  variant={chartType === "bar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleChartTypeChange("bar")}
                  className={chartType !== "bar" ? "border-slate-800 bg-slate-900" : ""}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Çubuk
                </Button>
                <Button
                  variant={chartType === "line" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleChartTypeChange("line")}
                  className={chartType !== "line" ? "border-slate-800 bg-slate-900" : ""}
                >
                  <LineChartIcon className="mr-2 h-4 w-4" />
                  Çizgi
                </Button>
                <Button
                  variant={chartType === "pie" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleChartTypeChange("pie")}
                  className={chartType !== "pie" ? "border-slate-800 bg-slate-900" : ""}
                >
                  <PieChartIcon className="mr-2 h-4 w-4" />
                  Pasta
                </Button>
                <Button
                  variant={chartType === "radar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleChartTypeChange("radar")}
                  className={chartType !== "radar" ? "border-slate-800 bg-slate-900" : ""}
                >
                  <RadarIcon className="mr-2 h-4 w-4" />
                  Radar
                </Button>
              </div>

              <div className="h-[450px] w-full">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center gap-4">
                      <RefreshCw className="h-8 w-8 text-indigo-500 animate-spin" />
                      <p className="text-slate-400">Grafik yükleniyor...</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {chartType === "scatter" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 30, bottom: 60, left: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis
                            dataKey={dataKeys.xKey}
                            name={dataKeys.xLabel}
                            stroke="#888"
                            label={{
                              value: dataKeys.xLabel,
                              position: "insideBottom",
                              offset: -10,
                              fill: "#888",
                            }}
                          />
                          <YAxis
                            dataKey={dataKeys.yKey}
                            name={dataKeys.yLabel}
                            stroke="#888"
                            label={{
                              value: dataKeys.yLabel,
                              angle: -90,
                              position: "insideLeft",
                              fill: "#888",
                            }}
                          />
                          <ZAxis dataKey={dataKeys.zKey} range={[50, 400]} name={dataKeys.zLabel} />
                          <RechartsTooltip
                            cursor={{ strokeDasharray: "3 3" }}
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload
                                return (
                                  <div className="bg-slate-900 border border-slate-700 p-3 rounded-md shadow-md">
                                    <p className="font-medium">{data.name}</p>
                                    <p className="text-sm text-slate-300">{`${dataKeys.xLabel}: ${data[dataKeys.xKey]}`}</p>
                                    <p className="text-sm text-slate-300">{`${dataKeys.yLabel}: ${data[dataKeys.yKey]}`}</p>
                                    <p className="text-sm text-slate-300">{`${dataKeys.zLabel}: ${data[dataKeys.zKey]}`}</p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                          <Legend />
                          <Scatter name="Nesneler" data={data} fill="#8884d8">
                            {data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Scatter>
                        </ScatterChart>
                      </ResponsiveContainer>
                    )}

                    {chartType === "bar" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 20, right: 30, bottom: 60, left: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis dataKey="name" stroke="#888" angle={-45} textAnchor="end" height={80} />
                          <YAxis
                            stroke="#888"
                            label={{
                              value: dataKeys.zLabel,
                              angle: -90,
                              position: "insideLeft",
                              fill: "#888",
                            }}
                          />
                          <RechartsTooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload
                                return (
                                  <div className="bg-slate-900 border border-slate-700 p-3 rounded-md shadow-md">
                                    <p className="font-medium">{data.name}</p>
                                    <p className="text-sm text-slate-300">{`${dataKeys.zLabel}: ${data[dataKeys.zKey]}`}</p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                          <Legend />
                          <Bar dataKey={dataKeys.zKey} name={dataKeys.zLabel} fill="#8884d8">
                            {data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    )}

                    {chartType === "line" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis
                            dataKey={dataKeys.xKey}
                            stroke="#888"
                            label={{
                              value: dataKeys.xLabel,
                              position: "insideBottom",
                              offset: -10,
                              fill: "#888",
                            }}
                          />
                          <YAxis
                            stroke="#888"
                            label={{
                              value: dataKeys.zLabel,
                              angle: -90,
                              position: "insideLeft",
                              fill: "#888",
                            }}
                          />
                          <RechartsTooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload
                                return (
                                  <div className="bg-slate-900 border border-slate-700 p-3 rounded-md shadow-md">
                                    <p className="font-medium">{data.name}</p>
                                    <p className="text-sm text-slate-300">{`${dataKeys.xLabel}: ${data[dataKeys.xKey]}`}</p>
                                    <p className="text-sm text-slate-300">{`${dataKeys.zLabel}: ${data[dataKeys.zKey]}`}</p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey={dataKeys.zKey}
                            name={dataKeys.zLabel}
                            stroke="#8884d8"
                            strokeWidth={2}
                            dot={{ fill: "#8884d8", r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}

                    {chartType === "pie" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            dataKey={dataKeys.yKey}
                            nameKey="name"
                            onMouseEnter={onPieEnter}
                          >
                            {data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    )}

                    {chartType === "radar" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={normalizedData.slice(0, 5)}>
                          <PolarGrid stroke="#444" />
                          <PolarAngleAxis dataKey="name" tick={{ fill: "#888" }} />
                          <PolarRadiusAxis angle={30} domain={[0, 1]} tick={{ fill: "#888" }} />
                          {dataKeys.radarKeys.map((key, index) => (
                            <Radar
                              key={key}
                              name={dataKeys.radarLabels[index]}
                              dataKey={key}
                              stroke={data[index]?.color || "#8884d8"}
                              fill={data[index]?.color || "#8884d8"}
                              fillOpacity={0.6}
                            />
                          ))}
                          <Legend />
                          <RechartsTooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    )}
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-slate-800 pt-4">
              <div className="flex items-center gap-2">
                <div className="text-sm text-slate-400">Yakınlaştırma:</div>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  value={zoomLevel}
                  onValueChange={setZoomLevel}
                  className="w-32"
                />
                <div className="text-sm text-slate-400">{zoomLevel}%</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-slate-800 bg-slate-900">
                  <Share2 className="mr-2 h-4 w-4" />
                  Paylaş
                </Button>
                <Button variant="outline" size="sm" className="border-slate-800 bg-slate-900">
                  <Download className="mr-2 h-4 w-4" />
                  İndir
                </Button>
              </div>
            </CardFooter>
          </Card>

          <div className="space-y-6">
            <Card className="bg-slate-950 border-slate-800 text-white">
              <CardHeader>
                <CardTitle>Veri Özeti</CardTitle>
                <CardDescription className="text-slate-400">
                  {dataset === "exoplanets"
                    ? "Dış gezegen verileri özeti"
                    : dataset === "stars"
                      ? "Yıldız verileri özeti"
                      : "Galaksi verileri özeti"}
                </CardDescription>
              </CardHeader>
              <Separator className="bg-slate-800" />
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {data.slice(0, 6).map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="text-slate-400 text-sm">
                        {dataset === "exoplanets"
                          ? `${item.radius} R⊕, ${item.temperature} K`
                          : dataset === "stars"
                            ? `${item.mass} M☉, ${item.temperature} K`
                            : `${(item.mass / 1e12).toFixed(2)} M☉, ${(item.diameter / 1000).toFixed(1)} kly`}
                      </div>
                    </div>
                  ))}
                </div>
                {data.length > 6 && (
                  <Button variant="link" className="mt-2 text-indigo-400 p-0 h-auto">
                    {data.length - 6} nesne daha göster
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="bg-slate-950 border-slate-800 text-white">
              <CardHeader>
                <CardTitle>İstatistiksel Analiz</CardTitle>
                <CardDescription className="text-slate-400">Temel istatistiksel ölçümler</CardDescription>
              </CardHeader>
              <Separator className="bg-slate-800" />
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-slate-400">Ortalama {dataKeys.xLabel.split(" ")[0]}</div>
                      <div className="font-medium">
                        {dataset === "galaxies"
                          ? (data.reduce((acc, item) => acc + item[dataKeys.xKey], 0) / data.length / 1e12).toFixed(2)
                          : (data.reduce((acc, item) => acc + item[dataKeys.xKey], 0) / data.length).toFixed(2)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-slate-400">Ortalama {dataKeys.yLabel.split(" ")[0]}</div>
                      <div className="font-medium">
                        {dataset === "galaxies"
                          ? (data.reduce((acc, item) => acc + item[dataKeys.yKey], 0) / data.length / 1000).toFixed(2)
                          : (data.reduce((acc, item) => acc + item[dataKeys.yKey], 0) / data.length).toFixed(2)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-slate-400">Maksimum {dataKeys.zLabel.split(" ")[0]}</div>
                      <div className="font-medium">
                        {Math.max(...data.map((item) => item[dataKeys.zKey])).toFixed(2)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-slate-400">Minimum {dataKeys.zLabel.split(" ")[0]}</div>
                      <div className="font-medium">
                        {Math.min(...data.map((item) => item[dataKeys.zKey])).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-sm text-slate-400 mb-1">Veri Dağılımı</div>
                    <div className="w-full bg-slate-800 rounded-full h-2.5">
                      <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>Min</span>
                      <span>Medyan</span>
                      <span>Maks</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="data" className="mt-0">
        <Card className="bg-slate-950 border-slate-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg font-medium">Veri Tablosu</CardTitle>
              <CardDescription className="text-slate-400">
                {dataset === "exoplanets"
                  ? "Dış gezegen verileri"
                  : dataset === "stars"
                    ? "Yıldız verileri"
                    : "Galaksi verileri"}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-slate-800 bg-slate-900">
                <Filter className="mr-2 h-4 w-4" />
                Filtrele
              </Button>
              <Button variant="outline" size="sm" className="border-slate-800 bg-slate-900">
                <Download className="mr-2 h-4 w-4" />
                CSV İndir
              </Button>
            </div>
          </CardHeader>
          <Separator className="bg-slate-800" />
          <CardContent className="pt-6">
            <div className="rounded-md border border-slate-800">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-900">
                      <th className="px-4 py-3 text-left font-medium text-slate-300">İsim</th>
                      {dataset === "exoplanets" ? (
                        <>
                          <th className="px-4 py-3 text-left font-medium text-slate-300">Mesafe (ly)</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-300">Yarıçap (R⊕)</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-300">Kütle (M⊕)</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-300">Sıcaklık (K)</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-300">Keşif Yılı</th>
                        </>
                      ) : dataset === "stars" ? (
                        <>
                          <th className="px-4 py-3 text-left font-medium text-slate-300">Tür</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-300">Kütle (M☉)</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-300">Yarıçap (R☉)</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-300">Sıcaklık (K)</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-300">Yaş (Milyar Yıl)</th>
                        </>
                      ) : (
                        <>
                          <th className="px-4 py-3 text-left font-medium text-slate-300">Tür</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-300">Çap (ly)</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-300">Kütle (M☉)</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-300">Yaş (Milyar Yıl)</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-300">Kırmızıya Kayma</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-slate-950" : "bg-slate-900/50"}>
                        <td className="px-4 py-3 font-medium">{item.name}</td>
                        {dataset === "exoplanets" ? (
                          <>
                            <td className="px-4 py-3">{item.distance}</td>
                            <td className="px-4 py-3">{item.radius}</td>
                            <td className="px-4 py-3">{item.mass}</td>
                            <td className="px-4 py-3">{item.temperature}</td>
                            <td className="px-4 py-3">{item.discoveryYear}</td>
                          </>
                        ) : dataset === "stars" ? (
                          <>
                            <td className="px-4 py-3">{item.type}</td>
                            <td className="px-4 py-3">{item.mass}</td>
                            <td className="px-4 py-3">{item.radius}</td>
                            <td className="px-4 py-3">{item.temperature}</td>
                            <td className="px-4 py-3">{item.age}</td>
                          </>
                        ) : (
                          <>
                            <td className="px-4 py-3">{item.type}</td>
                            <td className="px-4 py-3">{item.diameter.toLocaleString()}</td>
                            <td className="px-4 py-3">{item.mass.toExponential(2)}</td>
                            <td className="px-4 py-3">{item.age}</td>
                            <td className="px-4 py-3">{item.redshift}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-slate-400">Toplam {data.length} kayıt gösteriliyor</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-slate-800 bg-slate-900" disabled>
                  Önceki
                </Button>
                <Button variant="outline" size="sm" className="border-slate-800 bg-slate-900 bg-slate-800">
                  1
                </Button>
                <Button variant="outline" size="sm" className="border-slate-800 bg-slate-900">
                  2
                </Button>
                <Button variant="outline" size="sm" className="border-slate-800 bg-slate-900">
                  3
                </Button>
                <Button variant="outline" size="sm" className="border-slate-800 bg-slate-900">
                  Sonraki
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  )
}
