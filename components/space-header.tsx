"use client"

import { useState } from "react"
import { Search, Menu, Globe, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

interface SpaceHeaderProps {
  onDatasetChange: (dataset: string) => void
  currentDataset: string
}

export function SpaceHeader({ onDatasetChange, currentDataset }: SpaceHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const datasets = [
    { id: "exoplanets", name: "Dış Gezegenler" },
    { id: "stars", name: "Yıldızlar" },
    { id: "galaxies", name: "Galaksiler" },
    { id: "asteroids", name: "Asteroidler" },
    { id: "satellites", name: "Uydular" },
  ]

  const datasetName = datasets.find((d) => d.id === currentDataset)?.name || "Veri Seti"

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-black/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menüyü Aç</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black text-white border-slate-800">
              <nav className="flex flex-col gap-4 mt-8">
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
                  Ayarlar
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-purple-500" />
            <span className="font-bold text-lg hidden md:inline-block">Uzay Veri Analizi</span>
          </div>
        </div>

        <div className="flex items-center gap-4 max-w-sm flex-1 mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              type="search"
              placeholder="Veri ara..."
              className="w-full bg-slate-950 border-slate-800 pl-8 text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-slate-800 bg-black text-white">
                <Database className="mr-2 h-4 w-4" />
                {datasetName}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-950 border-slate-800 text-white">
              {datasets.map((dataset) => (
                <DropdownMenuItem
                  key={dataset.id}
                  onClick={() => onDatasetChange(dataset.id)}
                  className={currentDataset === dataset.id ? "bg-slate-800" : ""}
                >
                  {dataset.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
