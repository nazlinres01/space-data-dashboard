"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, MapPin, AlertCircle, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AstronomicalEventsDashboard() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ]

  const upcomingEvents = [
    {
      id: "meteor-shower-1",
      name: "Perseid Meteor Yağmuru",
      date: "12-13 Ağustos 2023",
      time: "Gece boyunca",
      type: "Meteor Yağmuru",
      description: "Saatte 100'e kadar meteor görülebilir.",
      visibility: "Kuzey Yarımküre'den en iyi görünür",
      importance: "high",
    },
    {
      id: "eclipse-1",
      name: "Kısmi Güneş Tutulması",
      date: "14 Ekim 2023",
      time: "17:00 - 19:30",
      type: "Güneş Tutulması",
      description: "Güneş'in %82'si Ay tarafından örtülecek.",
      visibility: "Avrupa, Kuzey Afrika ve Orta Doğu'dan görülebilir",
      importance: "high",
    },
    {
      id: "planet-1",
      name: "Mars ve Venüs Yakınlaşması",
      date: "5 Temmuz 2023",
      time: "04:30 - 05:30",
      type: "Gezegen Yakınlaşması",
      description: "İki gezegen gökyüzünde birbirine çok yakın görünecek.",
      visibility: "Doğu ufkunda, şafaktan önce",
      importance: "medium",
    },
    {
      id: "moon-1",
      name: "Süper Ay",
      date: "1 Ağustos 2023",
      time: "Gece boyunca",
      type: "Ay Olayı",
      description: "Ay, Dünya'ya en yakın konumunda ve dolunay evresinde olacak.",
      visibility: "Tüm dünyadan görülebilir",
      importance: "medium",
    },
    {
      id: "meteor-shower-2",
      name: "Leonid Meteor Yağmuru",
      date: "17-18 Kasım 2023",
      time: "Gece boyunca",
      type: "Meteor Yağmuru",
      description: "Saatte 15'e kadar meteor görülebilir.",
      visibility: "Her iki yarımküreden de görülebilir",
      importance: "medium",
    },
    {
      id: "eclipse-2",
      name: "Tam Ay Tutulması",
      date: "28 Ekim 2023",
      time: "20:00 - 23:30",
      type: "Ay Tutulması",
      description: "Ay tamamen Dünya'nın gölgesine girecek.",
      visibility: "Asya, Avrupa, Afrika, Kuzey Amerika ve Güney Amerika'dan görülebilir",
      importance: "high",
    },
  ]

  const monthlyEvents = {
    0: [
      // Ocak
      {
        id: "jan-1",
        name: "Quadrantid Meteor Yağmuru",
        date: "3-4 Ocak",
        type: "Meteor Yağmuru",
        importance: "medium",
      },
      {
        id: "jan-2",
        name: "Merkür En Büyük Batı Uzanımı",
        date: "7 Ocak",
        type: "Gezegen Gözlemi",
        importance: "low",
      },
    ],
    1: [
      // Şubat
      {
        id: "feb-1",
        name: "Venüs En Büyük Doğu Uzanımı",
        date: "12 Şubat",
        type: "Gezegen Gözlemi",
        importance: "medium",
      },
    ],
    2: [
      // Mart
      {
        id: "mar-1",
        name: "İlkbahar Ekinoksu",
        date: "20 Mart",
        type: "Mevsimsel Olay",
        importance: "medium",
      },
    ],
    3: [
      // Nisan
      {
        id: "apr-1",
        name: "Lyrid Meteor Yağmuru",
        date: "22-23 Nisan",
        type: "Meteor Yağmuru",
        importance: "medium",
      },
    ],
    4: [
      // Mayıs
      {
        id: "may-1",
        name: "Eta Aquarid Meteor Yağmuru",
        date: "6-7 Mayıs",
        type: "Meteor Yağmuru",
        importance: "medium",
      },
    ],
    5: [
      // Haziran
      {
        id: "jun-1",
        name: "Yaz Gündönümü",
        date: "21 Haziran",
        type: "Mevsimsel Olay",
        importance: "medium",
      },
    ],
    6: [
      // Temmuz
      {
        id: "jul-1",
        name: "Mars ve Venüs Yakınlaşması",
        date: "5 Temmuz",
        type: "Gezegen Yakınlaşması",
        importance: "medium",
      },
      {
        id: "jul-2",
        name: "Delta Aquarid Meteor Yağmuru",
        date: "28-29 Temmuz",
        type: "Meteor Yağmuru",
        importance: "low",
      },
    ],
    7: [
      // Ağustos
      {
        id: "aug-1",
        name: "Süper Ay",
        date: "1 Ağustos",
        type: "Ay Olayı",
        importance: "medium",
      },
      {
        id: "aug-2",
        name: "Perseid Meteor Yağmuru",
        date: "12-13 Ağustos",
        type: "Meteor Yağmuru",
        importance: "high",
      },
    ],
    8: [
      // Eylül
      {
        id: "sep-1",
        name: "Sonbahar Ekinoksu",
        date: "23 Eylül",
        type: "Mevsimsel Olay",
        importance: "medium",
      },
    ],
    9: [
      // Ekim
      {
        id: "oct-1",
        name: "Draconid Meteor Yağmuru",
        date: "8-9 Ekim",
        type: "Meteor Yağmuru",
        importance: "low",
      },
      {
        id: "oct-2",
        name: "Kısmi Güneş Tutulması",
        date: "14 Ekim",
        type: "Güneş Tutulması",
        importance: "high",
      },
      {
        id: "oct-3",
        name: "Orionid Meteor Yağmuru",
        date: "21-22 Ekim",
        type: "Meteor Yağmuru",
        importance: "medium",
      },
      {
        id: "oct-4",
        name: "Tam Ay Tutulması",
        date: "28 Ekim",
        type: "Ay Tutulması",
        importance: "high",
      },
    ],
    10: [
      // Kasım
      {
        id: "nov-1",
        name: "Taurid Meteor Yağmuru",
        date: "4-5 Kasım",
        type: "Meteor Yağmuru",
        importance: "low",
      },
      {
        id: "nov-2",
        name: "Leonid Meteor Yağmuru",
        date: "17-18 Kasım",
        type: "Meteor Yağmuru",
        importance: "medium",
      },
    ],
    11: [
      // Aralık
      {
        id: "dec-1",
        name: "Geminid Meteor Yağmuru",
        date: "13-14 Aralık",
        type: "Meteor Yağmuru",
        importance: "high",
      },
      {
        id: "dec-2",
        name: "Kış Gündönümü",
        date: "21 Aralık",
        type: "Mevsimsel Olay",
        importance: "medium",
      },
      {
        id: "dec-3",
        name: "Ursid Meteor Yağmuru",
        date: "22-23 Aralık",
        type: "Meteor Yağmuru",
        importance: "low",
      },
    ],
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const renderEventBadge = (importance: string) => {
    switch (importance) {
      case "high":
        return <Badge className="bg-red-600">Yüksek</Badge>
      case "medium":
        return <Badge className="bg-yellow-600">Orta</Badge>
      case "low":
        return <Badge className="bg-blue-600">Düşük</Badge>
      default:
        return <Badge className="bg-slate-600">Belirsiz</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Astronomik Olaylar</h2>
          <p className="text-slate-400 text-sm">Yaklaşan gökyüzü olayları ve astronomik fenomenler</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-slate-800 bg-slate-900">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Takvime Ekle
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="upcoming">Yaklaşan Olaylar</TabsTrigger>
          <TabsTrigger value="calendar">Takvim Görünümü</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="bg-slate-950 border-slate-800 text-white">
                <CardHeader className="pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{event.name}</CardTitle>
                        {renderEventBadge(event.importance)}
                      </div>
                      <CardDescription className="text-slate-400">{event.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="border-slate-700 bg-slate-900 whitespace-nowrap">
                      {event.type}
                    </Badge>
                  </div>
                </CardHeader>
                <Separator className="bg-slate-800" />
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-400">Tarih:</span>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-400">Saat:</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-400">Görünürlük:</span>
                        <span>{event.visibility}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-end">
                      <Button className="bg-indigo-600 hover:bg-indigo-700">Hatırlatıcı Ekle</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <Card className="bg-slate-950 border-slate-800 text-white">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>
                  {months[currentMonth]} {currentYear}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8 border-slate-800" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 border-slate-800" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-slate-400">Aylık astronomik olaylar</CardDescription>
            </CardHeader>
            <Separator className="bg-slate-800" />
            <CardContent className="pt-6">
              {monthlyEvents[currentMonth as keyof typeof monthlyEvents]?.length ? (
                <div className="space-y-4">
                  {monthlyEvents[currentMonth as keyof typeof monthlyEvents].map((event) => (
                    <div
                      key={event.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-slate-900 rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-10 rounded-full ${
                            event.importance === "high"
                              ? "bg-red-600"
                              : event.importance === "medium"
                                ? "bg-yellow-600"
                                : "bg-blue-600"
                          }`}
                        ></div>
                        <div>
                          <div className="font-medium">{event.name}</div>
                          <div className="text-sm text-slate-400">{event.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <Badge variant="outline" className="border-slate-700 bg-slate-800">
                          {event.type}
                        </Badge>
                        {renderEventBadge(event.importance)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <AlertCircle className="h-12 w-12 mb-4" />
                  <p>Bu ay için kayıtlı astronomik olay bulunmamaktadır.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-950 border-slate-800 text-white">
          <CardHeader>
            <CardTitle>Meteor Yağmurları</CardTitle>
            <CardDescription className="text-slate-400">Yıllık meteor yağmurları</CardDescription>
          </CardHeader>
          <Separator className="bg-slate-800" />
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                  <span>Quadrantid</span>
                </div>
                <span className="text-sm text-slate-400">3-4 Ocak</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <span>Lyrid</span>
                </div>
                <span className="text-sm text-slate-400">22-23 Nisan</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <span>Eta Aquarid</span>
                </div>
                <span className="text-sm text-slate-400">6-7 Mayıs</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  <span>Perseid</span>
                </div>
                <span className="text-sm text-slate-400">12-13 Ağustos</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                  <span>Leonid</span>
                </div>
                <span className="text-sm text-slate-400">17-18 Kasım</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  <span>Geminid</span>
                </div>
                <span className="text-sm text-slate-400">13-14 Aralık</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-950 border-slate-800 text-white">
          <CardHeader>
            <CardTitle>Tutulmalar</CardTitle>
            <CardDescription className="text-slate-400">Güneş ve Ay tutulmaları</CardDescription>
          </CardHeader>
          <Separator className="bg-slate-800" />
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  <span>Kısmi Güneş Tutulması</span>
                </div>
                <span className="text-sm text-slate-400">14 Ekim</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  <span>Tam Ay Tutulması</span>
                </div>
                <span className="text-sm text-slate-400">28 Ekim</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-950 border-slate-800 text-white">
          <CardHeader>
            <CardTitle>Mevsimsel Olaylar</CardTitle>
            <CardDescription className="text-slate-400">Ekinoks ve gündönümleri</CardDescription>
          </CardHeader>
          <Separator className="bg-slate-800" />
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                  <span>İlkbahar Ekinoksu</span>
                </div>
                <span className="text-sm text-slate-400">20 Mart</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                  <span>Yaz Gündönümü</span>
                </div>
                <span className="text-sm text-slate-400">21 Haziran</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                  <span>Sonbahar Ekinoksu</span>
                </div>
                <span className="text-sm text-slate-400">23 Eylül</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                  <span>Kış Gündönümü</span>
                </div>
                <span className="text-sm text-slate-400">21 Aralık</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
