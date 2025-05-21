"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AstraHeader } from "@/components/astra-header"
import { DataVisualizationPanel } from "@/components/data-visualization-panel"
import { CelestialObjectsVisualization } from "@/components/celestial-objects-visualization"
import { AdvancedAnalyticsPanel } from "@/components/advanced-analytics-panel"
import { MissionControlPanel } from "@/components/mission-control-panel"
import { AstronomicalEventsDashboard } from "@/components/astronomical-events-dashboard"
import { AstraFooter } from "@/components/astra-footer"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function AstraAnalyticsDashboard() {
  const [selectedDataset, setSelectedDataset] = useState("exoplanets")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Veri senkronizasyonu tamamlandı",
        description: "Tüm uzay verileri başarıyla yüklendi ve analiz için hazır.",
      })
    }, 1500)

    return () => clearTimeout(timer)
  }, [toast])

  const handleDatasetChange = (dataset: string) => {
    setIsLoading(true)
    setSelectedDataset(dataset)

    // Simulate data loading when changing datasets
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: `${dataset === "exoplanets" ? "Dış Gezegen" : dataset === "stars" ? "Yıldız" : dataset === "galaxies" ? "Galaksi" : "Uydu"} verileri yüklendi`,
        description: "Veriler başarıyla güncellendi ve analiz için hazır.",
      })
    }, 800)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <AstraHeader onDatasetChange={handleDatasetChange} currentDataset={selectedDataset} />

      <div className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        {isLoading ? (
          <div className="flex items-center justify-center h-[70vh]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 text-indigo-500 animate-spin" />
              <p className="text-slate-400">Uzay verileri yükleniyor...</p>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="visualization" className="w-full">
            <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-5 h-auto p-1 bg-slate-900/50 backdrop-blur-sm">
              <TabsTrigger value="visualization" className="py-3">
                Veri Görselleştirme
              </TabsTrigger>
              <TabsTrigger value="celestial" className="py-3">
                Gök Cisimleri
              </TabsTrigger>
              <TabsTrigger value="analytics" className="py-3">
                Gelişmiş Analiz
              </TabsTrigger>
              <TabsTrigger value="missions" className="py-3">
                Görev Kontrolü
              </TabsTrigger>
              <TabsTrigger value="events" className="py-3">
                Astronomik Olaylar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="visualization" className="mt-6">
              <DataVisualizationPanel dataset={selectedDataset} />
            </TabsContent>

            <TabsContent value="celestial" className="mt-6">
              <CelestialObjectsVisualization dataset={selectedDataset} />
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <AdvancedAnalyticsPanel dataset={selectedDataset} />
            </TabsContent>

            <TabsContent value="missions" className="mt-6">
              <MissionControlPanel />
            </TabsContent>

            <TabsContent value="events" className="mt-6">
              <AstronomicalEventsDashboard />
            </TabsContent>
          </Tabs>
        )}
      </div>

      <AstraFooter />
    </div>
  )
}
