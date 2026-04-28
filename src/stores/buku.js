import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBukuStore = defineStore('buku', () => {
  const daftarBuku = ref([
    {
      id: 1,
      judul: 'Clean Code',
      penulis: 'Robert C. Martin',
      kategori: 'Teknologi',
      penerbit: 'Prentice Hall',
      tahun: 2008,
      isbn: '978-0132350884',
      tersedia: true,
      stok: 3,
      sinopsis:
        'Buku ini membahas prinsip-prinsip penulisan kode yang bersih dan mudah dipelihara. Robert Martin berbagi pengalaman dan teknik untuk menghasilkan kode yang dapat dibaca, diuji, dan direfaktor dengan mudah.',
    },
    {
      id: 2,
      judul: 'Vue.js 3 for Beginners',
      penulis: 'Simone Cuomo',
      kategori: 'Teknologi',
      penerbit: 'Packt',
      tahun: 2024,
      isbn: '978-1803246635',
      tersedia: false,
      stok: 0,
      sinopsis:
        'Panduan lengkap untuk memulai pengembangan aplikasi web modern menggunakan Vue.js 3, Composition API, dan ekosistem Vue terkini.',
    },
    {
      id: 3,
      judul: 'Learning Vue',
      penulis: 'Maya Shavin',
      kategori: 'Teknologi',
      penerbit: "O'Reilly",
      tahun: 2024,
      isbn: '978-1492098829',
      tersedia: true,
      stok: 2,
      sinopsis:
        'Buku praktis yang memandu pembaca membangun aplikasi Vue.js dari dasar hingga tingkat lanjut dengan pendekatan yang mudah dipahami.',
    },
    {
      id: 4,
      judul: 'Bumi',
      penulis: 'Tere Liye',
      kategori: 'Fiksi',
      penerbit: 'Gramedia',
      tahun: 2014,
      isbn: '978-6020282381',
      tersedia: true,
      stok: 5,
      sinopsis:
        'Novel fantasi karya Tere Liye yang mengisahkan petualangan Raib, seorang gadis yang memiliki kemampuan menghilang dan menemukan dunia paralel yang menakjubkan.',
    },
    {
      id: 5,
      judul: 'Sapiens',
      penulis: 'Yuval Noah Harari',
      kategori: 'Sejarah',
      penerbit: 'Harper',
      tahun: 2011,
      isbn: '978-0062316097',
      tersedia: false,
      stok: 0,
      sinopsis:
        'Sebuah perjalanan singkat melalui sejarah umat manusia, dari munculnya Homo sapiens di Afrika hingga penaklukan ilmu pengetahuan dan teknologi modern.',
    },
    {
      id: 6,
      judul: 'Atomic Habits',
      penulis: 'James Clear',
      kategori: 'Bisnis',
      penerbit: 'Avery',
      tahun: 2018,
      isbn: '978-0735211292',
      tersedia: true,
      stok: 4,
      sinopsis:
        'Panduan praktis untuk membangun kebiasaan baik dan menghilangkan kebiasaan buruk melalui perubahan kecil yang memberikan hasil luar biasa.',
    },
    {
      id: 7,
      judul: 'The Pragmatic Programmer',
      penulis: 'David Thomas',
      kategori: 'Teknologi',
      penerbit: 'Addison-Wesley',
      tahun: 1999,
      isbn: '978-0135957059',
      tersedia: true,
      stok: 2,
      sinopsis:
        'Buku klasik yang berisi tips dan filosofi praktis untuk menjadi programmer yang lebih efektif dan profesional.',
    },
    {
      id: 8,
      judul: 'Laskar Pelangi',
      penulis: 'Andrea Hirata',
      kategori: 'Fiksi',
      penerbit: 'Bentang',
      tahun: 2005,
      isbn: '978-6022910305',
      tersedia: false,
      stok: 0,
      sinopsis:
        'Novel inspiratif tentang perjuangan sekelompok anak di Belitung yang bersemangat mengejar pendidikan meski dalam keterbatasan.',
    },
  ])

  function pinjam(id) {
    const buku = daftarBuku.value.find((b) => b.id === id)
    if (buku && buku.tersedia && buku.stok > 0) {
      buku.stok--
      if (buku.stok === 0) buku.tersedia = false
    }
  }

  function kembalikan(id) {
    const buku = daftarBuku.value.find((b) => b.id === id)
    if (buku) {
      buku.stok++
      buku.tersedia = true
    }
  }

  function getBukuById(id) {
    return daftarBuku.value.find((b) => b.id === id)
  }

  return { daftarBuku, pinjam, kembalikan, getBukuById }
})
