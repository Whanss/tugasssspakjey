<template>
  <div class="min-h-screen">
    <!-- HERO -->
    <section class="bg-gradient-to-br from-primary/5 via-background to-secondary/20">
      <div class="container mx-auto px-4 py-20 text-center">
        <Badge variant="outline" class="mb-4 gap-1.5">
          <BookMarked class="h-3 w-3" /> Sistem Perpustakaan Digital
        </Badge>
        <h1 class="text-5xl font-extrabold tracking-tight text-foreground mb-4">
          Selamat Datang di <span class="text-primary">SiPerpus</span>
        </h1>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Kelola koleksi buku, anggota, dan peminjaman dalam satu platform modern.
        </p>
        <div class="flex gap-3 justify-center flex-wrap">
          <Button size="lg" as-child>
            <RouterLink to="/katalog">
              <BookOpen class="mr-2 h-5 w-5" /> Jelajahi Katalog
            </RouterLink>
          </Button>
          <Button size="lg" variant="outline" as-child>
            <RouterLink to="/">Masuk Akun</RouterLink>
          </Button>
        </div>
      </div>
    </section>

    <!-- STATISTIK -->
    <section class="container mx-auto px-4 py-16">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold">Statistik Perpustakaan</h2>
        <p class="text-muted-foreground mt-2">Data koleksi real-time</p>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card v-for="item in kartuStat" :key="item.id" class="relative overflow-hidden">
          <CardHeader class="pb-2">
            <CardDescription>{{ item.label }}</CardDescription>
            <CardTitle class="text-3xl font-extrabold">{{ item.nilai }}</CardTitle>
          </CardHeader>
          <CardContent>
            <p v-if="item.sub" class="text-xs text-muted-foreground">{{ item.sub }}</p>
          </CardContent>
          <div class="absolute right-4 top-4 opacity-10">
            <component :is="item.icon" class="h-16 w-16" />
          </div>
        </Card>
      </div>
    </section>

    <!-- DEMO REAKTIVITAS -->
    <section class="container mx-auto px-4 pb-16">
      <Card class="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Demo Reaktivitas Vue.js 3</CardTitle>
          <CardDescription
            >Gunakan counter dan perhatikan statistik berubah otomatis</CardDescription
          >
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex gap-8 justify-center">
            <div class="text-center">
              <p class="text-sm text-muted-foreground mb-2">Total Judul Buku</p>
              <span class="text-2xl font-bold">{{ totalJudul }}</span>
            </div>
            <div class="text-center">
              <p class="text-sm text-muted-foreground mb-2">Buku Dipinjam (stok habis)</p>
              <div class="flex items-center gap-3">
                <Button variant="outline" size="icon" @click="kurangi" :disabled="bukuDipinjam <= 0"
                  >−</Button
                >
                <span class="text-2xl font-bold w-16 text-center">{{ bukuDipinjam }}</span>
                <Button variant="outline" size="icon" @click="tambah" :disabled="bukuTersedia <= 0"
                  >+</Button
                >
              </div>
            </div>
          </div>
          <div class="space-y-1">
            <div class="flex justify-between text-sm text-muted-foreground">
              <span>Buku Tersedia</span>
              <span>{{ bukuTersedia }} ({{ persenTersedia }})</span>
            </div>
            <div class="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div
                class="h-full bg-primary rounded-full transition-all duration-500"
                :style="{ width: persenTersedia }"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBukuStore } from '@/stores/buku'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, BookMarked, BookCopy, BookCheck, Users } from 'lucide-vue-next'

const bukuStore = useBukuStore()

const totalAnggota = 328 // data statis (belum ada store anggota)

const bukuTersedia = computed(() => bukuStore.bukuTersedia)
const totalJudul = computed(() => bukuStore.totalJudul)
const bukuDipinjam = computed(() => bukuStore.bukuDipinjam)

const persenTersedia = computed(() => {
  if (!totalJudul.value) return '0%'
  return ((bukuTersedia.value / totalJudul.value) * 100).toFixed(1) + '%'
})

const kartuStat = computed(() => [
  { id: 'buku', icon: BookCopy, label: 'Total Buku', nilai: totalJudul.value, sub: null },
  { id: 'anggota', icon: Users, label: 'Anggota Aktif', nilai: totalAnggota, sub: null },
  { id: 'pinjam', icon: BookOpen, label: 'Dipinjam', nilai: bukuDipinjam.value, sub: null },
  {
    id: 'tersedia',
    icon: BookCheck,
    label: 'Buku Tersedia',
    nilai: bukuTersedia.value,
    sub: persenTersedia.value,
  },
])

function tambah() {
  // Simulasi: pinjam buku pertama yang tersedia
  const buku = bukuStore.daftarBuku.find((b) => b.tersedia && b.stok > 0)
  if (buku) bukuStore.pinjam(buku.id)
}
function kurangi() {
  // Simulasi: kembalikan buku pertama yang stoknya 0
  const buku = bukuStore.daftarBuku.find((b) => b.stok === 0)
  if (buku) bukuStore.kembalikan(buku.id)
}
</script>
