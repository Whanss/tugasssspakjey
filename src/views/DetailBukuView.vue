<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Back -->
      <Button variant="ghost" class="mb-6 gap-2" as-child>
        <RouterLink to="/katalog"> <ArrowLeft class="h-4 w-4" /> Kembali ke Katalog </RouterLink>
      </Button>

      <!-- Not found -->
      <div v-if="!buku" class="text-center py-20 text-muted-foreground">
        <BookX class="h-16 w-16 mx-auto mb-4" />
        <p class="text-lg font-medium">Buku tidak ditemukan</p>
      </div>

      <template v-else>
        <Card class="mb-6">
          <CardContent class="p-6">
            <div class="flex flex-col sm:flex-row gap-6">
              <!-- Cover -->
              <div class="w-full sm:w-48 shrink-0">
                <div
                  class="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center border"
                >
                  <div class="text-center text-muted-foreground">
                    <BookOpen class="h-12 w-12 mx-auto mb-2" />
                    <p class="text-sm">Cover</p>
                  </div>
                </div>
              </div>

              <!-- Info -->
              <div class="flex-1 space-y-4">
                <h1 class="text-2xl font-bold text-foreground">{{ buku.judul }}</h1>

                <div class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                  <span class="text-muted-foreground font-medium">Penulis</span>
                  <span>{{ buku.penulis }}</span>
                  <span class="text-muted-foreground font-medium">Penerbit</span>
                  <span>{{ buku.penerbit }}</span>
                  <span class="text-muted-foreground font-medium">Tahun</span>
                  <span>{{ buku.tahun }}</span>
                  <span class="text-muted-foreground font-medium">ISBN</span>
                  <span>{{ buku.isbn }}</span>
                  <span class="text-muted-foreground font-medium">Kategori</span>
                  <div>
                    <Badge variant="outline">{{ buku.kategori }}</Badge>
                  </div>
                  <span class="text-muted-foreground font-medium">Status</span>
                  <div class="flex items-center gap-2">
                    <Badge :variant="buku.tersedia ? 'default' : 'secondary'">
                      {{ buku.tersedia ? 'Tersedia' : 'Dipinjam' }}
                    </Badge>
                    <span class="text-sm text-muted-foreground">({{ buku.stok }} stok)</span>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex gap-3 pt-2 flex-wrap">
                  <Button :disabled="!buku.tersedia" @click="handlePinjam">
                    <BookMarked class="mr-2 h-4 w-4" />
                    Pinjam Buku
                  </Button>
                  <Button
                    variant="outline"
                    :disabled="buku.tersedia && buku.stok >= 1 && !dipinjamUser"
                    @click="handleKembalikan"
                  >
                    <Undo2 class="mr-2 h-4 w-4" />
                    Kembalikan
                  </Button>
                  <Button variant="ghost" @click="handleSimpan">
                    <Bookmark class="mr-2 h-4 w-4" />
                    Simpan
                  </Button>
                </div>

                <!-- Notifikasi -->
                <p v-if="notif" class="text-sm font-medium" :class="notifColor">{{ notif }}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Sinopsis -->
        <Card>
          <CardHeader>
            <CardTitle class="text-base flex items-center gap-2">
              <FileText class="h-4 w-4" /> Sinopsis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground leading-relaxed">{{ buku.sinopsis }}</p>
          </CardContent>
        </Card>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useBukuStore } from '@/stores/buku'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, BookOpen, BookMarked, Bookmark, FileText, BookX, Undo2 } from 'lucide-vue-next'

const route = useRoute()
const bukuStore = useBukuStore()

const buku = computed(() => bukuStore.getBukuById(Number(route.params.id)))
const dipinjamUser = ref(false)
const notif = ref('')
const notifColor = ref('text-green-600')

function handlePinjam() {
  bukuStore.pinjam(buku.value.id)
  dipinjamUser.value = true
  notif.value = `Buku "${buku.value.judul}" berhasil dipinjam!`
  notifColor.value = 'text-green-600'
}

function handleKembalikan() {
  bukuStore.kembalikan(buku.value.id)
  dipinjamUser.value = false
  notif.value = `Buku "${buku.value.judul}" berhasil dikembalikan!`
  notifColor.value = 'text-blue-600'
}

function handleSimpan() {
  notif.value = `Buku "${buku.value.judul}" disimpan ke daftar bacaan!`
  notifColor.value = 'text-muted-foreground'
}
</script>
