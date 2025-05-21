import { Github, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function AstraFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 backdrop-blur-md mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="font-bold text-lg text-white">Astra Analytics</span>
            </div>
            <p className="text-sm text-slate-400">
              Profesyonel uzay veri analizi ve görselleştirme platformu. Uzay verilerini keşfedin, analiz edin ve
              paylaşın.
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-white mb-3">Veri Kaynakları</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  NASA Açık API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  ESA Veri Portalı
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  SETI Veritabanı
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Exoplanet Archive
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Gaia Veri Sürümü
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-3">Hızlı Erişim</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Gösterge Paneli
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Veri Görselleştirme
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Gelişmiş Analiz
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Görev Kontrolü
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Astronomik Olaylar
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-3">Destek</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Dokümantasyon
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API Referansı
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Topluluk Forumu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sık Sorulan Sorular
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  İletişim
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6 bg-slate-800" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Astra Analytics. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">
              Gizlilik Politikası
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Kullanım Şartları
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Çerez Politikası
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
