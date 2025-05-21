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
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface DataVisualizationProps {
  dataset: string
}

export function DataVisualization({ dataset }: DataVisualizationProps) {
  const [chartType, setChartType] = useState("scatter")

  // Sample data - in a real app, this would come from an API based on the dataset
  const exoplanetData = [
    { name: "Kepler-186f", distance: 492, radius: 1.17, temperature: 188, color: "#FF5733" },
    { name: "Kepler-442b", distance: 1206, radius: 1.34, temperature: 233, color: "#33FF57" },
    { name: "Kepler-62f", distance: 1200, radius: 1.41, temperature: 208, color: "#3357FF" },
    { name: "Kepler-452b", distance: 1402, radius: 1.63, temperature: 265, color: "#F3FF33" },
    { name: "Proxima Centauri b", distance: 4.2, radius: 1.08, temperature: 234, color: "#FF33F3" },
    { name: "TRAPPIST-1e", distance: 39, radius: 0.92, temperature: 251, color: "#33FFF3" },
    { name: "TRAPPIST-1f", distance: 39, radius: 1.04, temperature: 219, color: "#CB33FF" },
    { name: "TOI-700 d", distance: 101, radius: 1.19, temperature: 268, color: "#FF8C33" },
    { name: "K2-18b", distance: 124, radius: 2.6, temperature: 265, color: "#33FF8C" },
  ]

  const starData = [
    { name: "Güneş", type: "G", mass: 1, luminosity: 1, temperature: 5778, color: "#FFCC33" },
    { name: "Sirius", type: "A", mass: 2.02, luminosity: 25.4, temperature: 9940, color: "#FFFFFF" },
    { name: "Alpha Centauri A", type: "G", mass: 1.1, luminosity: 1.519, temperature: 5790, color: "#FFCC33" },
    { name: "Vega", type: "A", mass: 2.135, luminosity: 40.12, temperature: 9602, color: "#FFFFFF" },
    { name: "Betelgeuse", type: "M", mass: 11.6, luminosity: 126000, temperature: 3500, color: "#FF3333" },
    { name: "Proxima Centauri", type: "M", mass: 0.122, luminosity: 0.0017, temperature: 3042, color: "#FF3333" },
  ]

  // Select the appropriate data based on the dataset prop
  const data = dataset === "stars" ? starData : exoplanetData

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">
          {dataset === "exoplanets"
            ? "Dış Gezegen Verileri"
            : dataset === "stars"
              ? "Yıldız Verileri"
              : "Uzay Nesneleri Verileri"}
        </h2>

        <Select value={chartType} onValueChange={setChartType}>
          <SelectTrigger className="w-[180px] bg-slate-950 border-slate-800 text-white">
            <SelectValue placeholder="Grafik Türü" />
          </SelectTrigger>
          <SelectContent className="bg-slate-950 border-slate-800 text-white">
            <SelectItem value="scatter">Dağılım Grafiği</SelectItem>
            <SelectItem value="bar">Çubuk Grafik</SelectItem>
            <SelectItem value="line">Çizgi Grafik</SelectItem>
            <SelectItem value="pie">Pasta Grafik</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 bg-slate-950 border-slate-800 text-white">
          <CardHeader>
            <CardTitle>
              {chartType === "scatter"
                ? "Dağılım Grafiği"
                : chartType === "bar"
                  ? "Çubuk Grafik"
                  : chartType === "line"
                    ? "Çizgi Grafik"
                    : "Pasta Grafik"}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {dataset === "exoplanets"
                ? "Dış gezegenlerin mesafe ve yarıçap ilişkisi"
                : "Yıldızların kütle ve parlaklık ilişkisi"}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            {chartType === "scatter" && (
              <ChartContainer
                config={{
                  planets: {
                    label: "Gezegenler",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis
                      dataKey={dataset === "exoplanets" ? "distance" : "mass"}
                      name={dataset === "exoplanets" ? "Mesafe (ışık yılı)" : "Kütle (Güneş kütlesi)"}
                      stroke="#888"
                    />
                    <YAxis
                      dataKey={dataset === "exoplanets" ? "radius" : "luminosity"}
                      name={dataset === "exoplanets" ? "Yarıçap (Dünya yarıçapı)" : "Parlaklık (Güneş parlaklığı)"}
                      stroke="#888"
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Scatter name="Nesneler" data={data} fill="#8884d8">
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}

            {chartType === "bar" && (
              <ChartContainer
                config={{
                  objects: {
                    label: "Nesneler",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 20, right: 30, bottom: 60, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#888" angle={-45} textAnchor="end" height={80} />
                    <YAxis
                      dataKey={dataset === "exoplanets" ? "temperature" : "temperature"}
                      stroke="#888"
                      label={{ value: "Sıcaklık (K)", angle: -90, position: "insideLeft", fill: "#888" }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey={dataset === "exoplanets" ? "temperature" : "temperature"} fill="#8884d8">
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}

            {chartType === "line" && (
              <ChartContainer
                config={{
                  objects: {
                    label: "Nesneler",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis
                      dataKey={dataset === "exoplanets" ? "distance" : "mass"}
                      stroke="#888"
                      label={{
                        value: dataset === "exoplanets" ? "Mesafe (ışık yılı)" : "Kütle (Güneş kütlesi)",
                        position: "insideBottom",
                        fill: "#888",
                      }}
                    />
                    <YAxis
                      dataKey={dataset === "exoplanets" ? "temperature" : "temperature"}
                      stroke="#888"
                      label={{ value: "Sıcaklık (K)", angle: -90, position: "insideLeft", fill: "#888" }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey={dataset === "exoplanets" ? "temperature" : "temperature"}
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ fill: "#8884d8", r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}

            {chartType === "pie" && (
              <ChartContainer
                config={{
                  objects: {
                    label: "Nesneler",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey={dataset === "exoplanets" ? "radius" : "mass"}
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      label={(entry) => entry.name}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card className="bg-slate-950 border-slate-800 text-white">
          <CardHeader>
            <CardTitle>Veri Özeti</CardTitle>
            <CardDescription className="text-slate-400">
              {dataset === "exoplanets" ? "Dış gezegen verileri özeti" : "Yıldız verileri özeti"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span>{item.name}</span>
                  </div>
                  <div className="text-slate-400">
                    {dataset === "exoplanets"
                      ? `${item.radius} R⊕, ${item.temperature} K`
                      : `${item.mass} M☉, ${item.temperature} K`}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
