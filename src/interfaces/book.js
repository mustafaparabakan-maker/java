/**
 * Kitap veri yapısı (interface)
 *
 * @typedef {Object} Book
 * @property {string} id          Benzersiz kimlik
 * @property {string} title       Kitap adı (zorunlu)
 * @property {string} author      Yazar
 * @property {number} pages       Toplam sayfa sayısı
 * @property {number} currentPage Okunan sayfa (sadece "okunuyor" durumunda anlamlı)
 * @property {'okunacak'|'okunuyor'|'okundu'} status  Okuma durumu
 * @property {number} rating      0-5 arası puan
 * @property {string} note        Kısa not
 * @property {string} createdAt   Eklenme zamanı (ISO)
 */

export const STATUSES = [
  { value: 'okunacak', label: 'Okunacak' },
  { value: 'okunuyor', label: 'Okunuyor' },
  { value: 'okundu', label: 'Okundu' }
];

export const STATUS_LABELS = Object.fromEntries(STATUSES.map((s) => [s.value, s.label]));

/** Boş form için varsayılan değerler */
export const EMPTY_BOOK = {
  title: '',
  author: '',
  pages: '',
  currentPage: '',
  status: 'okunacak',
  rating: 0,
  note: ''
};

/** Uygulama ilk açıldığında gösterilecek örnek kitaplar */
export const SAMPLE_BOOKS = [
  {
    id: 'ornek-1',
    title: 'Kürk Mantolu Madonna',
    author: 'Sabahattin Ali',
    pages: 160,
    currentPage: 160,
    status: 'okundu',
    rating: 5,
    note: 'Bir solukta bitti.',
    createdAt: '2026-10-02T18:00:00.000Z'
  },
  {
    id: 'ornek-2',
    title: 'Saatleri Ayarlama Enstitüsü',
    author: 'Ahmet Hamdi Tanpınar',
    pages: 392,
    currentPage: 140,
    status: 'okunuyor',
    rating: 0,
    note: '',
    createdAt: '2026-10-20T18:00:00.000Z'
  },
  {
    id: 'ornek-3',
    title: 'Tutunamayanlar',
    author: 'Oğuz Atay',
    pages: 724,
    currentPage: 0,
    status: 'okunacak',
    rating: 0,
    note: 'Kış tatiline.',
    createdAt: '2026-11-01T18:00:00.000Z'
  }
];
