"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SpaceHeader } from "@/components/space-header"
import { DataVisualization } from "@/components/data-visualization"
import { SpaceObjectsMap } from "@/components/space-objects-map"
import { DataAnalysisPanel } from "@/components/data-analysis-panel"
import { MissionTimeline } from "@/components/mission-timeline"
import { SatelliteTracker } from "@/components/satellite-tracker"

export function SpaceDashboard() {
  const [selectedDataset, setSelectedDataset] = useState("exoplanets")

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-b from-black to-slate-900 text-white">
      <SpaceHeader onDatasetChange={setSelectedDataset} currentDataset={selectedDataset} />

      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Tabs defaultValue="visualization" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
            <TabsTrigger value="visualization">Görselleştirme</TabsTrigger>
            <TabsTrigger value="analysis">Analiz</TabsTrigger>
            <TabsTrigger value="map">Harita</TabsTrigger>
            <TabsTrigger value="missions">Görevler</TabsTrigger>
          </TabsList>

          <TabsContent value="visualization" className="mt-6">
            <DataVisualization dataset={selectedDataset} />
          </TabsContent>

          <TabsContent value="analysis" className="mt-6">
            <DataAnalysisPanel dataset={selectedDataset} />
          </TabsContent>

          <TabsContent value="map" className="mt-6">
            <SpaceObjectsMap dataset={selectedDataset} />
          </TabsContent>

          <TabsContent value="missions" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MissionTimeline />
              <SatelliteTracker />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
