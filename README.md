# Rafım — Okuma Takip Uygulaması

Okuduğun, okumakta olduğun ve okumak istediğin kitapları tek bir rafta toplayan, React ile geliştirilmiş bir web uygulaması. Veriler tarayıcının **LocalStorage**'ında saklanır; sayfa yenilense de kaybolmaz.

![Rafım ekran görüntüsü](screenshots/kitaplarim.png)

## Özellikler

- **Ekle:** Kitap adı, yazar, sayfa sayısı, durum, puan ve not ile yeni kitap ekleme
- **Listele:** Kitapları kart görünümünde listeleme; duruma göre filtreleme, arama ve sıralama
- **Güncelle:** Kitap bilgilerini düzenleme, okuma ilerlemesini (sayfa) güncelleme
- **Sil:** Onay alarak kitabı raftan kaldırma
- **İstatistikler:** Toplam kitap, bitirilen kitap, okunan sayfa, ortalama puan ve en sevilen kitaplar
- Açık / koyu tema desteği (sistem ayarına göre) ve mobil uyumlu tasarım

## Kullanılan Teknolojiler

| Teknoloji | Kullanım |
|-----------|----------|
| React 19 | Arayüz kütüphanesi |
| Vite | Geliştirme sunucusu ve derleme |
| Pure CSS | Stil (CSS değişkenleri, Grid, Flexbox) |
| LocalStorage | Veri saklama |

## Kurulum ve Çalıştırma

Gereksinim: [Node.js](https://nodejs.org/) 18 veya üzeri

```bash
# 1. Bağımlılıkları yükleyin
npm install

# 2. Geliştirme sunucusunu başlatın
npm run dev
```

Terminalde çıkan adresi (genellikle `http://localhost:5173`) tarayıcıda açın.

Yayına almak için:

```bash
npm run build
```

Oluşan `dist` klasörü Netlify, Vercel veya benzeri bir servise yüklenebilir.

## Proje Yapısı

```
rafim/
├── index.html
├── package.json
├── vite.config.js
├── screenshots/            # Proje ekran görüntüleri
└── src/
    ├── main.jsx            # Uygulamanın giriş noktası
    ├── App.jsx             # Ekle / güncelle / sil fonksiyonları ve sayfa geçişi
    ├── index.css           # Tüm stiller
    ├── components/         # Tekrar kullanılabilir parçalar
    │   ├── Header.jsx
    │   ├── BookForm.jsx    # Ekleme ve düzenleme formu
    │   ├── BookList.jsx
    │   ├── BookCard.jsx
    │   ├── FilterBar.jsx
    │   ├── StarRating.jsx
    │   └── EmptyState.jsx
    ├── pages/              # Sayfalar
    │   ├── LibraryPage.jsx # Kitaplarım
    │   └── StatsPage.jsx   # İstatistikler
    ├── interfaces/         # Veri yapıları ve sabitler
    │   └── book.js
    └── hooks/
        └── useLocalStorage.js
```
