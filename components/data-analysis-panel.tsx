"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Download, Filter, RotateCcw, Zap } from "lucide-react"

interface DataAnalysisPanelProps {
  dataset: string
}

export function DataAnalysisPanel({ dataset }: DataAnalysisPanelProps) {
  const [analysisType, setAnalysisType] = useState("correlation")
  const [filterValue, setFilterValue] = useState([50])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Veri Analizi</h2>

        <Select value={analysisType} onValueChange={setAnalysisType}>
          <SelectTrigger className="w-[180px] bg-slate-950 border-slate-800 text-white">
            <SelectValue placeholder="Analiz Türü" />
          </SelectTrigger>
          <SelectContent className="bg-slate-950 border-slate-800 text-white">
            <SelectItem value="correlation">Korelasyon Analizi</SelectItem>
            <SelectItem value="clustering">Kümeleme Analizi</SelectItem>
            <SelectItem value="regression">Regresyon Analizi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 bg-slate-950 border-slate-800 text-white">
          <CardHeader>
            <CardTitle>
              {analysisType === "correlation"
                ? "Korelasyon Analizi"
                : analysisType === "clustering"
                  ? "Kümeleme Analizi"
                  : "Regresyon Analizi"}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {dataset === "exoplanets"
                ? "Dış gezegen özelliklerinin ilişki analizi"
                : "Yıldız özelliklerinin ilişki analizi"}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto">
                <Zap className="w-12 h-12 text-purple-500" />
              </div>
              <p className="text-slate-400">
                Analiz çalıştırmak için parametreleri ayarlayın ve "Analiz Et" düğmesine tıklayın.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700">Analiz Et</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-slate-950 border-slate-800 text-white">
            <CardHeader>
              <CardTitle>Analiz Parametreleri</CardTitle>
              <CardDescription className="text-slate-400">Analiz için parametreleri ayarlayın</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">X Ekseni Değişkeni</label>
                  <Select defaultValue={dataset === "exoplanets" ? "distance" : "mass"}>
                    <SelectTrigger className="bg-slate-900 border-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-950 border-slate-800">
                      {dataset === "exoplanets" ? (
                        <>
                          <SelectItem value="distance">Mesafe</SelectItem>
                          <SelectItem value="radius">Yarıçap</SelectItem>
                          <SelectItem value="temperature">Sıcaklık</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="mass">Kütle</SelectItem>
                          <SelectItem value="luminosity">Parlaklık</SelectItem>
                          <SelectItem value="temperature">Sıcaklık</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Y Ekseni Değişkeni</label>
                  <Select defaultValue={dataset === "exoplanets" ? "radius" : "luminosity"}>
                    <SelectTrigger className="bg-slate-900 border-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-950 border-slate-800">
                      {dataset === "exoplanets" ? (
                        <>
                          <SelectItem value="distance">Mesafe</SelectItem>
                          <SelectItem value="radius">Yarıçap</SelectItem>
                          <SelectItem value="temperature">Sıcaklık</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="mass">Kütle</SelectItem>
                          <SelectItem value="luminosity">Parlaklık</SelectItem>
                          <SelectItem value="temperature">Sıcaklık</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Filtre Eşiği</label>
                    <span className="text-sm text-slate-400">{filterValue}%</span>
                  </div>
                  <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    value={filterValue}
                    onValueChange={setFilterValue}
                    className="py-4"
                  />
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex-1 border-slate-700">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Sıfırla
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-slate-700">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrele
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-950 border-slate-800 text-white">
            <CardHeader>
              <CardTitle>Sonuçlar</CardTitle>
              <CardDescription className="text-slate-400">Analiz sonuçları</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <p className="text-slate-400">Henüz analiz çalıştırılmadı.</p>
                <Button variant="outline" size="sm" className="w-full border-slate-700" disabled>
                  <Download className="mr-2 h-4 w-4" />
                  Sonuçları İndir
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
