"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function MissionTimeline() {
  const missions = [
    {
      name: "James Webb Uzay Teleskobu",
      date: "25 Aralık 2021",
      status: "Aktif",
      description: "Kızılötesi gözlemler için tasarlanmış uzay teleskobu.",
      highlights: ["L2 Lagrange noktasında", "6.5 metre ana ayna", "Kızılötesi gözlem"],
    },
    {
      name: "Perseverance Rover",
      date: "18 Şubat 2021",
      status: "Aktif",
      description: "Mars'ta yaşam izleri arayan keşif aracı.",
      highlights: ["Jezero Krateri'nde", "Örnek toplama", "Ingenuity helikopteri"],
    },
    {
      name: "Parker Solar Probe",
      date: "12 Ağustos 2018",
      status: "Aktif",
      description: "Güneş'in dış atmosferini inceleyen uzay aracı.",
      highlights: ["Güneş'e en yakın uzay aracı", "Isı kalkanı", "Güneş rüzgarı ölçümleri"],
    },
    {
      name: "Voyager 1",
      date: "5 Eylül 1977",
      status: "Aktif",
      description: "Güneş Sistemi'nin dışına ulaşan ilk insan yapımı nesne.",
      highlights: ["Yıldızlararası uzayda", "45+ yıldır aktif", "23 milyar km uzaklıkta"],
    },
  ]

  return (
    <Card className="bg-slate-950 border-slate-800 text-white">
      <CardHeader>
        <CardTitle>Uzay Görevleri Zaman Çizelgesi</CardTitle>
        <CardDescription className="text-slate-400">Önemli uzay görevleri ve durumları</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6 border-l border-slate-700">
          {missions.map((mission, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <div className="absolute w-3 h-3 rounded-full bg-purple-500 -left-[6.5px]"></div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <h3 className="font-bold">{mission.name}</h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-400">{mission.date}</span>
                  <Badge variant={mission.status === "Aktif" ? "default" : "secondary"} className="bg-green-600">
                    {mission.status}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-2">{mission.description}</p>
              <div className="flex flex-wrap gap-2">
                {mission.highlights.map((highlight, i) => (
                  <Badge key={i} variant="outline" className="border-slate-700 bg-slate-900">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
