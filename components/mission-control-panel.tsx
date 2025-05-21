"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Rocket, AlertCircle, CheckCircle, Clock, Calendar, Download, Share2 } from "lucide-react"

export function MissionControlPanel() {
  const [activeTab, setActiveTab] = useState("active")

  const activeMissions = [
    {
      id: "jwst",
      name: "James Webb Uzay Teleskobu",
      date: "25 Aralık 2021",
      status: "Aktif",
      description: "Kızılötesi gözlemler için tasarlanmış uzay teleskobu.",
      highlights: ["L2 Lagrange noktasında", "6.5 metre ana ayna", "Kızılötesi gözlem"],
      progress: 100,
      lastUpdate: "2 saat önce",
      type: "Teleskop",
    },
    {
      id: "perseverance",
      name: "Perseverance Rover",
      date: "18 Şubat 2021",
      status: "Aktif",
      description: "Mars'ta yaşam izleri arayan keşif aracı.",
      highlights: ["Jezero Krateri'nde", "Örnek toplama", "Ingenuity helikopteri"],
      progress: 100,
      lastUpdate: "5 saat önce",
      type: "Gezegen Keşif",
    },
    {
      id: "parker",
      name: "Parker Solar Probe",
      date: "12 Ağustos 2018",
      status: "Aktif",
      description: "Güneş'in dış atmosferini inceleyen uzay aracı.",
      highlights: ["Güneş'e en yakın uzay aracı", "Isı kalkanı", "Güneş rüzgarı ölçümleri"],
      progress: 100,
      lastUpdate: "1 gün önce",
      type: "Güneş Araştırması",
    },
    {
      id: "iss",
      name: "Uluslararası Uzay İstasyonu",
      date: "20 Kasım 1998",
      status: "Aktif",
      description: "Dünya yörüngesinde çok uluslu bir uzay istasyonu.",
      highlights: ["Sürekli insan varlığı", "Bilimsel araştırmalar", "Uluslararası işbirliği"],
      progress: 100,
      lastUpdate: "30 dakika önce",
      type: "Uzay İstasyonu",
    },
  ]

  const plannedMissions = [
    {
      id: "artemis",
      name: "Artemis Programı",
      date: "2025 (Planlanan)",
      status: "Hazırlık",
      description: "İnsanları Ay'a geri götürmeyi amaçlayan program.",
      highlights: ["Ay'a insan indirme", "Ay yörüngesinde istasyon", "Mars'a gidiş için hazırlık"],
      progress: 65,
      lastUpdate: "1 hafta önce",
      type: "İnsanlı Keşif",
    },
    {
      id: "europa-clipper",
      name: "Europa Clipper",
      date: "Ekim 2024 (Planlanan)",
      status: "Hazırlık",
      description: "Jüpiter'in uydusu Europa'yı inceleyecek uzay aracı.",
      highlights: ["Buz kabuğu altındaki okyanus", "Yaşam potansiyeli", "Jeolojik aktivite"],
      progress: 80,
      lastUpdate: "3 gün önce",
      type: "Gezegen Keşif",
    },
    {
      id: "nancy-grace",
      name: "Nancy Grace Roman Teleskobu",
      date: "Mayıs 2027 (Planlanan)",
      status: "Yapım Aşamasında",
      description: "Geniş alan kızılötesi gözlemler için tasarlanmış uzay teleskobu.",
      highlights: ["Karanlık enerji araştırması", "Dış gezegen keşfi", "Geniş alan gözlemi"],
      progress: 45,
      lastUpdate: "2 hafta önce",
      type: "Teleskop",
    },
  ]

  const completedMissions = [
    {
      id: "cassini",
      name: "Cassini-Huygens",
      date: "15 Ekim 1997",
      endDate: "15 Eylül 2017",
      status: "Tamamlandı",
      description: "Satürn ve uydularını inceleyen uzay aracı.",
      highlights: ["Satürn'ün halkaları", "Titan'a iniş", "20 yıllık görev"],
      progress: 100,
      lastUpdate: "15 Eylül 2017",
      type: "Gezegen Keşif",
    },
    {
      id: "kepler",
      name: "Kepler Uzay Teleskobu",
      date: "7 Mart 2009",
      endDate: "30 Ekim 2018",
      status: "Tamamlandı",
      description: "Dış gezegen keşfi için tasarlanmış uzay teleskobu.",
      highlights: ["2600+ dış gezegen keşfi", "Yaşanabilir bölge araştırması", "9 yıllık görev"],
      progress: 100,
      lastUpdate: "30 Ekim 2018",
      type: "Teleskop",
    },
    {
      id: "opportunity",
      name: "Opportunity Rover",
      date: "7 Temmuz 2003",
      endDate: "13 Şubat 2019",
      status: "Tamamlandı",
      description: "Mars'ı keşfeden uzun ömürlü gezgin robot.",
      highlights: ["45 km yol kat etti", "15 yıllık görev", "Su izleri keşfi"],
      progress: 100,
      lastUpdate: "13 Şubat 2019",
      type: "Gezegen Keşif",
    },
  ]

  const renderMissionList = (missions: any[]) => {
    return (
      <div className="space-y-6">
        {missions.map((mission) => (
          <Card key={mission.id} className="bg-slate-950 border-slate-800 text-white overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{mission.name}</CardTitle>
                    <Badge
                      variant={
                        mission.status === "Aktif" ? "default" : mission.status === "Hazırlık" ? "outline" : "secondary"
                      }
                      className={
                        mission.status === "Aktif"
                          ? "bg-green-600"
                          : mission.status === "Hazırlık"
                            ? "border-yellow-600 text-yellow-500"
                            : "bg-blue-600"
                      }
                    >
                      {mission.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-slate-400">{mission.description}</CardDescription>
                </div>
                <Badge variant="outline" className="border-slate-700 bg-slate-900 whitespace-nowrap">
                  {mission.type}
                </Badge>
              </div>
            </CardHeader>
            <Separator className="bg-slate-800" />
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-400">Başlangıç:</span>
                    <span>{mission.date}</span>
                  </div>
                  {mission.endDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-400">Bitiş:</span>
                      <span>{mission.endDate}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-400">Son Güncelleme:</span>
                    <span>{mission.lastUpdate}</span>
                  </div>
                  {mission.progress < 100 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Görev İlerlemesi</span>
                        <span>{mission.progress}%</span>
                      </div>
                      <Progress value={mission.progress} className="h-2" />
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="text-sm text-slate-400">Öne Çıkanlar:</div>
                  <div className="flex flex-wrap gap-2">
                    {mission.highlights.map((highlight: string, i: number) => (
                      <Badge key={i} variant="outline" className="border-slate-700 bg-slate-900">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Button variant="outline" size="sm" className="border-slate-800 bg-slate-900">
                      <Download className="mr-2 h-4 w-4" />
                      Rapor
                    </Button>
                    <Button variant="outline" size="sm" className="border-slate-800 bg-slate-900">
                      <Share2 className="mr-2 h-4 w-4" />
                      Paylaş
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Görev Kontrolü</h2>
          <p className="text-slate-400 text-sm">Aktif, planlanan ve tamamlanmış uzay görevleri</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span className="text-slate-400">Aktif: {activeMissions.length}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
            <span className="text-slate-400">Planlanan: {plannedMissions.length}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-slate-400">Tamamlanan: {completedMissions.length}</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="active" className="data-[state=active]:bg-green-600">
            Aktif Görevler
          </TabsTrigger>
          <TabsTrigger value="planned" className="data-[state=active]:bg-yellow-600">
            Planlanan Görevler
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-blue-600">
            Tamamlanan Görevler
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          {renderMissionList(activeMissions)}
        </TabsContent>

        <TabsContent value="planned" className="mt-6">
          {renderMissionList(plannedMissions)}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {renderMissionList(completedMissions)}
        </TabsContent>
      </Tabs>

      <Card className="bg-slate-950 border-slate-800 text-white">
        <CardHeader className="pb-2">
          <CardTitle>Görev İstatistikleri</CardTitle>
          <CardDescription className="text-slate-400">Uzay görevleri hakkında genel istatistikler</CardDescription>
        </CardHeader>
        <Separator className="bg-slate-800" />
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center">
                  <Rocket className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{activeMissions.length}</div>
                  <div className="text-sm text-slate-400">Aktif Görev</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-600/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{plannedMissions.length}</div>
                  <div className="text-sm text-slate-400">Planlanan Görev</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{completedMissions.length}</div>
                  <div className="text-sm text-slate-400">Tamamlanan Görev</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {activeMissions.length + plannedMissions.length + completedMissions.length}
                  </div>
                  <div className="text-sm text-slate-400">Toplam Görev</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
