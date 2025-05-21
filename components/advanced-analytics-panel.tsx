"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Zap,
  BarChart3,
  Network,
  Sigma,
  RefreshCw,
  Share2,
  Check,
  X,
  AlertTriangle,
  Info,
  Download,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AdvancedAnalyticsPanelProps {
  dataset: string
}

export function AdvancedAnalyticsPanel({ dataset }: AdvancedAnalyticsPanelProps) {
  const [analysisType, setAnalysisType] = useState("correlation")
  const [filterValue, setFilterValue] = useState([50])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisTab, setAnalysisTab] = useState("results")
  const [confidenceLevel, setConfidenceLevel] = useState([95])
  const [analysis, setAnalysis] = useState<string | null>(null)

  // Function to run analysis
  const runAnalysis = () => {
    setIsAnalyzing(true)
    setAnalysisComplete(false)
    setAnalysisProgress(0)

    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          setAnalysisComplete(true)
          setAnalysis("Sample analysis result")
          return 100
        }
        return prev + 5
      })
    }, 150)
  }

  // Reset analysis
  const resetAnalysis = () => {
    setAnalysisComplete(false)
    setAnalysisProgress(0)
    setAnalysis(null)
  }

  // Get appropriate parameter labels based on dataset
  const getParameterLabels = () => {
    if (dataset === "exoplanets") {
      return {
        xOptions: [
          { value: "distance", label: "Mesafe" },
          { value: "radius", label: "Yarıçap" },
          { value: "mass", label: "Kütle" },
          { value: "temperature", label: "Sıcaklık" },
          { value: "habitability", label: "Yaşanabilirlik" },
        ],
        yOptions: [
          { value: "radius", label: "Yarıçap" },
          { value: "mass", label: "Kütle" },
          { value: "temperature", label: "Sıcaklık" },
          { value: "habitability", label: "Yaşanabilirlik" },
          { value: "distance", label: "Mesafe" },
        ],
        filterLabel: "Minimum Yaşanabilirlik Eşiği",
        analysisTitle: "Dış Gezegen Analizi",
        analysisDescription: "Dış gezegen özelliklerinin ilişki analizi",
      }
    } else if (dataset === "stars") {
      return {
        xOptions: [
          { value: "mass", label: "Kütle" },
          { value: "radius", label: "Yarıçap" },
          { value: "luminosity", label: "Parlaklık" },
          { value: "temperature", label: "Sıcaklık" },
          { value: "age", label: "Yaş" },
        ],
        yOptions: [
          { value: "luminosity", label: "Parlaklık" },
          { value: "temperature", label: "Sıcaklık" },
          { value: "radius", label: "Yarıçap" },
          { value: "mass", label: "Kütle" },
          { value: "age", label: "Yaş" },
        ],
        filterLabel: "Minimum Sıcaklık Eşiği",
        analysisTitle: "Yıldız Analizi",
        analysisDescription: "Yıldız özelliklerinin ilişki analizi",
      }
    } else {
      return {
        xOptions: [
          { value: "mass", label: "Kütle" },
          { value: "diameter", label: "Çap" },
          { value: "stars", label: "Yıldız Sayısı" },
          { value: "age", label: "Yaş" },
          { value: "redshift", label: "Kırmızıya Kayma" },
        ],
        yOptions: [
          { value: "diameter", label: "Çap" },
          { value: "stars", label: "Yıldız Sayısı" },
          { value: "age", label: "Yaş" },
          { value: "redshift", label: "Kırmızıya Kayma" },
          { value: "mass", label: "Kütle" },
        ],
        filterLabel: "Minimum Yaş Eşiği",
        analysisTitle: "Galaksi Analizi",
        analysisDescription: "Galaksi özelliklerinin ilişki analizi",
      }
    }
  }

  const paramLabels = getParameterLabels()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Gelişmiş Veri Analizi</h2>
          <p className="text-slate-400 text-sm">
            {dataset === "exoplanets"
              ? "Dış gezegen verilerinin detaylı istatistiksel analizi"
              : dataset === "stars"
                ? "Yıldız verilerinin detaylı istatistiksel analizi"
                : "Galaksi verilerinin detaylı istatistiksel analizi"}
          </p>
        </div>

        <Select value={analysisType} onValueChange={setAnalysisType}>
          <SelectTrigger className="w-[220px] bg-slate-950 border-slate-800 text-white">
            <SelectValue placeholder="Analiz Türü" />
          </SelectTrigger>
          <SelectContent className="bg-slate-950 border-slate-800 text-white">
            <SelectItem value="correlation">Korelasyon Analizi</SelectItem>
            <SelectItem value="clustering">Kümeleme Analizi</SelectItem>
            <SelectItem value="regression">Regresyon Analizi</SelectItem>
            <SelectItem value="pca">Temel Bileşen Analizi</SelectItem>
            <SelectItem value="anomaly">Anomali Tespiti</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 bg-slate-950 border-slate-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>
                {analysisType === "correlation"
                  ? "Korelasyon Analizi"
                  : analysisType === "clustering"
                    ? "Kümeleme Analizi"
                    : analysisType === "regression"
                      ? "Regresyon Analizi"
                      : analysisType === "pca"
                        ? "Temel Bileşen Analizi"
                        : "Anomali Tespiti"}
              </CardTitle>
              <CardDescription className="text-slate-400">{paramLabels.analysisDescription}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8 border-slate-800">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Analiz Bilgisi</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8 border-slate-800">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Analizi Paylaş</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <Separator className="bg-slate-800" />

          {!analysisComplete ? (
            <CardContent className="pt-6">
              {isAnalyzing ? (
                <div className="h-[400px] flex flex-col items-center justify-center">
                  <div className="w-full max-w-md space-y-6">
                    <div className="text-center space-y-2">
                      <RefreshCw className="w-12 h-12 text-indigo-500 animate-spin mx-auto" />
                      <h3 className="text-lg font-medium mt-4">Analiz Çalışıyor</h3>
                      <p className="text-slate-400 text-sm">
                        {analysisType === "correlation"
                          ? "Değişkenler arasındaki ilişkiler hesaplanıyor..."
                          : analysisType === "clustering"
                            ? "Veri kümeleri oluşturuluyor..."
                            : analysisType === "regression"
                              ? "Regresyon modeli oluşturuluyor..."
                              : analysisType === "pca"
                                ? "Temel bileşenler hesaplanıyor..."
                                : "Anomaliler tespit ediliyor..."}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>İlerleme</span>
                        <span>{analysisProgress}%</span>
                      </div>
                      <Progress value={analysisProgress} className="h-2" />
                    </div>

                    <div className="space-y-2 text-sm text-slate-400">
                      <div className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        <span>Veri hazırlama tamamlandı</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        <span>Ön işleme tamamlandı</span>
                      </div>
                      <div className="flex items-center">
                        {analysisProgress > 50 ? (
                          <Check className="w-4 h-4 mr-2 text-green-500" />
                        ) : (
                          <RefreshCw className="w-4 h-4 mr-2 text-indigo-500 animate-spin" />
                        )}
                        <span>Model oluşturma {analysisProgress > 50 ? "tamamlandı" : "devam ediyor"}</span>
                      </div>
                      <div className="flex items-center">
                        {analysisProgress > 80 ? (
                          <Check className="w-4 h-4 mr-2 text-green-500" />
                        ) : analysisProgress > 50 ? (
                          <RefreshCw className="w-4 h-4 mr-2 text-indigo-500 animate-spin" />
                        ) : (
                          <X className="w-4 h-4 mr-2 text-slate-500" />
                        )}
                        <span>
                          Sonuçlar hazırlanıyor{" "}
                          {analysisProgress > 80 ? "tamamlandı" : analysisProgress > 50 ? "devam ediyor" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[400px] flex flex-col items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto">
                      {analysisType === "correlation" ? (
                        <Network className="w-12 h-12 text-indigo-500" />
                      ) : analysisType === "clustering" ? (
                        <BarChart3 className="w-12 h-12 text-indigo-500" />
                      ) : analysisType === "regression" ? (
                        <Sigma className="w-12 h-12 text-indigo-500" />
                      ) : analysisType === "pca" ? (
                        <Network className="w-12 h-12 text-indigo-500" />
                      ) : (
                        <AlertTriangle className="w-12 h-12 text-indigo-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Analiz Parametrelerini Ayarlayın</h3>
                      <p className="text-slate-400 text-sm mt-1">
                        Analiz çalıştırmak için parametreleri ayarlayın ve "Analiz Et" düğmesine tıklayın.
                      </p>
                    </div>
                    <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={runAnalysis}>
                      <Zap className="mr-2 h-4 w-4" />
                      Analiz Et
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          ) : (
            <CardContent className="p-0">
              <Tabs value={analysisTab} onValueChange={setAnalysisTab}>
                <div className="px-6 pt-6">
                  <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="results">Sonuçlar</TabsTrigger>
                    <TabsTrigger value="visualization">Görselleştirme</TabsTrigger>
                    <TabsTrigger value="insights">İçgörüler</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="results" className="p-6">
                  <div className="space-y-6">
                    <Alert className="bg-indigo-950/50 border-indigo-800 text-white">
                      <Info className="h-4 w-4 text-indigo-400" />
                      <AlertTitle>Analiz Tamamlandı</AlertTitle>
                      <AlertDescription className="text-slate-300">
                        {analysisType === "correlation"
                          ? "Değişkenler arasında güçlü korelasyonlar tespit edildi."
                          : analysisType === "clustering"
                            ? "Veriler 3 farklı kümede gruplandı."
                            : analysisType === "regression"
                              ? "Regresyon modeli %87 doğruluk oranıyla oluşturuldu."
                              : analysisType === "pca"
                                ? "İlk 2 temel bileşen varyansın %78'ini açıklıyor."
                                : "5 potansiyel anomali tespit edildi."}
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-slate-900 border-slate-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">İstatistiksel Özet</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">{analysis}</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="visualization" className="p-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Görselleştirme</h3>
                    <p className="text-slate-400 text-sm mt-1">Analiz sonuçlarını görselleştirin.</p>
                  </div>
                </TabsContent>
                <TabsContent value="insights" className="p-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">İçgörüler</h3>
                    <p className="text-slate-400 text-sm mt-1">Analiz sonuçlarından içgörüler çıkarın.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          )}
        </Card>

        <div className="space-y-6">
          <Card className="bg-slate-950 border-slate-800 text-white">
            <CardHeader>
              <CardTitle>Analiz Parametreleri</CardTitle>
              <CardDescription className="text-slate-400">Analiz için parametreleri ayarlayın</CardDescription>
            </CardHeader>
            <Separator className="bg-slate-800" />
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">X Ekseni Değişkeni</label>
                  <Select defaultValue={paramLabels.xOptions[0].value}>
                    <SelectTrigger className="bg-slate-900 border-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-950 border-slate-800">
                      {paramLabels.xOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Y Ekseni Değişkeni</label>
                  <Select defaultValue={paramLabels.yOptions[0].value}>
                    <SelectTrigger className="bg-slate-900 border-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-950 border-slate-800">
                      {paramLabels.yOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">{paramLabels.filterLabel}</label>
                    <span className="text-sm text-slate-400">{filterValue}%</span>
                  </div>
                  <Progress value={filterValue[0]} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Güven Düzeyi</label>
                    <span className="text-sm text-slate-400">{confidenceLevel}%</span>
                  </div>
                  <Progress value={confidenceLevel[0]} className="h-2" />
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex-1 border-slate-700" onClick={resetAnalysis}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Sıfırla
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-slate-700">
                    <Share2 className="mr-2 h-4 w-4" />
                    Paylaş
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
            <Separator className="bg-slate-800" />
            <CardContent className="pt-6">
              <div className="space-y-4 text-sm">
                {analysisComplete ? (
                  <div className="space-y-2">
                    <p>
                      {analysisType === "correlation"
                        ? "Korelasyon analizi tamamlandı. Değişkenler arasında anlamlı ilişkiler bulundu."
                        : analysisType === "clustering"
                          ? "Kümeleme analizi tamamlandı. Veriler belirgin gruplara ayrıldı."
                          : analysisType === "regression"
                            ? "Regresyon analizi tamamlandı. Model yüksek doğruluk oranına sahip."
                            : analysisType === "pca"
                              ? "Temel bileşen analizi tamamlandı. Veri boyutsallığı azaltıldı."
                              : "Anomali tespiti tamamlandı. Olağandışı veri noktaları belirlendi."}
                    </p>
                    <Button variant="default" size="sm" className="w-full mt-2">
                      <Download className="mr-2 h-4 w-4" />
                      Sonuçları İndir
                    </Button>
                  </div>
                ) : (
                  <p className="text-slate-400">Henüz analiz çalıştırılmadı.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
