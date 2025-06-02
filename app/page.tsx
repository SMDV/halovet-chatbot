import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PawPrint, CalendarDays, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      {/* Hero Section */}
      <section className="w-full max-w-4xl text-center py-16 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MUQ2reWSw48hvMlyQfciYETkK5K4jN.png" // Updated image source to the provided logo
            width={120}
            height={120}
            alt="Halovet Logo with a hand holding a dog and a cat" // Updated alt text for the new logo
            className="mb-6 rounded-full shadow-lg"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            Halovet
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
            Asisten virtual Anda untuk kesehatan hewan peliharaan. Dapatkan diagnosis awal dan daftar konsultasi dengan
            mudah.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/chat">Mulai Chat Sekarang</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/guide">Pelajari Lebih Lanjut</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-4xl py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Fitur Utama Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="flex flex-col items-center text-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <PawPrint className="h-12 w-12 text-primary mb-4" />
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Diagnosis Kesehatan</CardTitle>
            </CardHeader>
            <CardContent>Dapatkan prediksi diagnosis awal berdasarkan gejala hewan peliharaan Anda.</CardContent>
          </Card>

          <Card className="flex flex-col items-center text-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CalendarDays className="h-12 w-12 text-secondary mb-4" />
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Jadwal Dokter</CardTitle>
            </CardHeader>
            <CardContent>Lihat ketersediaan jadwal dokter dan layanan konsultasi offline.</CardContent>
          </Card>

          <Card className="flex flex-col items-center text-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <MessageCircle className="h-12 w-12 text-primary mb-4" />
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Pendaftaran Konsultasi</CardTitle>
            </CardHeader>
            <CardContent>Daftar janji temu konsultasi offline langsung melalui chatbot.</CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-4xl text-center py-8 border-t border-gray-200 dark:border-gray-700 mt-16">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Halovet. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
