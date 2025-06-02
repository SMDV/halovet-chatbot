import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Rocket, Lightbulb, ClipboardList } from "lucide-react"

export default function GuidePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <div className="w-full max-w-5xl mx-auto my-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Panduan Penggunaan Halovet Chatbot
          </h1>
          <Button variant="outline" size="icon" asChild>
            <Link href="/chat" aria-label="Kembali ke Chat">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 text-center">
          Pelajari cara berinteraksi secara efektif dengan chatbot Halovet untuk diagnosis kesehatan hewan dan layanan
          pendaftaran klinik.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Getting Started Section */}
          <Card className="lg:col-span-2 shadow-md">
            <CardHeader className="flex flex-row items-center gap-3 pb-4">
              <Rocket className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl font-semibold">Memulai Chatbot</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Langkah-langkah dasar untuk berinteraksi dengan chatbot Halovet.
              </p>
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                    1
                  </span>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Mulai Percakapan</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Akses antarmuka chat dan sapa chatbot untuk memulai.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                    2
                  </span>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Pilih Alur Layanan</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Ketik perintah sesuai kebutuhan Anda (misal: "Konsul", "Jadwal", "Daftar").
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                    3
                  </span>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Ikuti Petunjuk Chatbot</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Jawab pertanyaan yang diajukan chatbot untuk menyelesaikan alur layanan.
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Tips Section */}
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center gap-3 pb-4">
              <Lightbulb className="h-6 w-6 text-secondary" />
              <CardTitle className="text-xl font-semibold">Tips Penggunaan</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Saran untuk interaksi yang lebih efektif dengan chatbot.
              </p>
              <div className="rounded-md bg-blue-50 dark:bg-blue-900/30 p-3 text-sm text-blue-800 dark:text-blue-200">
                **Gunakan Bahasa Natural:** Chatbot dirancang untuk memahami bahasa sehari-hari.
              </div>
              <div className="rounded-md bg-green-50 dark:bg-green-900/30 p-3 text-sm text-green-800 dark:text-green-200">
                **Reset Chat:** Gunakan tombol reset di pojok kanan atas untuk memulai percakapan baru.
              </div>
              <div className="rounded-md bg-purple-50 dark:bg-purple-900/30 p-3 text-sm text-purple-800 dark:text-purple-200">
                **Berikan Detail:** Semakin detail informasi yang Anda berikan, semakin akurat respons chatbot.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Features Section */}
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center gap-3 pb-4">
            <ClipboardList className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl font-semibold">Fitur Utama & Contoh Perintah</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Diagnosis */}
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Diagnosis Kesehatan</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Dapatkan prediksi diagnosis awal berdasarkan gejala hewan peliharaan Anda.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Konsul
                </span>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Konsultasi
                </span>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Hewan saya sakit
                </span>
              </div>
            </div>

            {/* Jadwal Dokter */}
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Jadwal Dokter</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Lihat ketersediaan jadwal dokter dan layanan konsultasi offline.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
                  Jadwal
                </span>
                <span className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
                  Jadwal dokter hari ini
                </span>
                <span className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
                  Jadwal drh. Rina
                </span>
              </div>
            </div>

            {/* Pendaftaran Konsultasi */}
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Pendaftaran Konsultasi</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Daftar janji temu konsultasi offline langsung melalui chatbot.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Daftar
                </span>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Booking
                </span>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Buat janji temu
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
