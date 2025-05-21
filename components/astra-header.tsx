"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Menu, Bell, User, ChevronDown, Globe, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AstraHeaderProps {
  onDatasetChange: (dataset: string) => void
  currentDataset: string
}

export function AstraHeader({ onDatasetChange, currentDataset }: AstraHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const datasets = [
    { id: "exoplanets", name: "Dış Gezegenler", count: 5284, icon: <Globe className="h-4 w-4" /> },
    { id: "stars", name: "Yıldızlar", count: 9631, icon: <Globe className="h-4 w-4" /> },
    { id: "galaxies", name: "Galaksiler", count: 3142, icon: <Globe className="h-4 w-4" /> },
    { id: "satellites", name: "Uydular", count: 1247, icon: <Globe className="h-4 w-4" /> },
  ]

  const datasetInfo = datasets.find((d) => d.id === currentDataset)

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log(`Searching for: ${searchQuery}`)
      // In a real app, this would trigger a search function
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menüyü Aç</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-slate-950 text-white border-slate-800">
                <div className="flex items-center gap-2 mb-8">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Globe className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-lg">Astra Analytics</span>
                </div>
                <nav className="flex flex-col gap-4">
                  <Button variant="ghost" className="justify-start">
                    Gösterge Paneli
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Veri Kaynakları
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Analiz Araçları
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Görev Kontrolü
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Ayarlar
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Globe className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg hidden md:inline-block">Astra Analytics</span>
            </div>
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex items-center max-w-sm flex-1 mx-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                type="search"
                placeholder="Uzay nesnesi, görev veya veri ara..."
                className="w-full bg-slate-900/50 border-slate-800 pl-8 text-white placeholder:text-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center text-sm text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-2">|</span>
              <span>UTC+3</span>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-indigo-500"></span>
                    <span className="sr-only">Bildirimler</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bildirimler</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-white">
                  {datasetInfo?.icon}
                  <span className="ml-2 mr-1">{datasetInfo?.name}</span>
                  <Badge variant="outline" className="ml-1 bg-slate-800 text-xs">
                    {datasetInfo?.count.toLocaleString()}
                  </Badge>
                  <ChevronDown className="ml-2 h-4 w-4 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-950 border-slate-800 text-white">
                <DropdownMenuLabel>Veri Setleri</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-800" />
                {datasets.map((dataset) => (
                  <DropdownMenuItem
                    key={dataset.id}
                    onClick={() => onDatasetChange(dataset.id)}
                    className={currentDataset === dataset.id ? "bg-slate-800" : ""}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        {dataset.icon}
                        <span className="ml-2">{dataset.name}</span>
                      </div>
                      <Badge variant="outline" className="ml-2 bg-slate-800 text-xs">
                        {dataset.count.toLocaleString()}
                      </Badge>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 ml-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-slate-800">UA</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-950 border-slate-800 text-white">
                <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Ayarlar</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem>Çıkış Yap</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
