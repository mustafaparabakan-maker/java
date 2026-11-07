import { useEffect, useState } from 'react';
import StarRating from './StarRating.jsx';
import { EMPTY_BOOK, STATUSES } from '../interfaces/book.js';

/**
 * Hem ekleme hem güncelleme için kullanılan form.
 * editingBook doluysa düzenleme modunda açılır.
 */
export default function BookForm({ editingBook, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY_BOOK);
  const [error, setError] = useState('');

  // Düzenlenecek kitap değişince formu onunla doldur
  useEffect(() => {
    setForm(editingBook ? { ...EMPTY_BOOK, ...editingBook } : EMPTY_BOOK);
    setError('');
  }, [editingBook]);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const title = form.title.trim();
    const pages = Number(form.pages) || 0;
    let currentPage = Number(form.currentPage) || 0;

    if (!title) return setError('Kitap adı boş bırakılamaz.');
    if (pages < 0) return setError('Sayfa sayısı negatif olamaz.');
    if (pages && currentPage > pages) return setError('Okunan sayfa, toplam sayfadan büyük olamaz.');

    if (form.status === 'okundu') currentPage = pages;
    if (form.status === 'okunacak') currentPage = 0;

    onSubmit({
      title,
      author: form.author.trim(),
      pages,
      currentPage,
      status: form.status,
      rating: form.rating,
      note: form.note.trim()
    });

    if (!editingBook) setForm(EMPTY_BOOK);
    setError('');
  }

  return (
    <form className="panel form" onSubmit={handleSubmit} noValidate>
      <h2 className="panel__title">{editingBook ? 'Kitabı Düzenle' : 'Yeni Kitap Ekle'}</h2>

      <label className="field">
        <span>Kitap adı *</span>
        <input
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="Ör. Çalıkuşu"
        />
      </label>

      <label className="field">
        <span>Yazar</span>
        <input
          value={form.author}
          onChange={(e) => update('author', e.target.value)}
          placeholder="Ör. Reşat Nuri Güntekin"
        />
      </label>

      <div className="field-row">
        <label className="field">
          <span>Sayfa</span>
          <input
            type="number"
            min="0"
            value={form.pages}
            onChange={(e) => update('pages', e.target.value)}
            placeholder="0"
          />
        </label>

        <label className="field">
          <span>Durum</span>
          <select value={form.status} onChange={(e) => update('status', e.target.value)}>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>
      </div>

      {form.status === 'okunuyor' && (
        <label className="field">
          <span>Kaçıncı sayfadasın?</span>
          <input
            type="number"
            min="0"
            value={form.currentPage}
            onChange={(e) => update('currentPage', e.target.value)}
            placeholder="0"
          />
        </label>
      )}

      <div className="field">
        <span>Puan</span>
        <StarRating value={form.rating} onChange={(v) => update('rating', v)} />
      </div>

      <label className="field">
        <span>Not</span>
        <textarea
          rows="2"
          value={form.note}
          onChange={(e) => update('note', e.target.value)}
          placeholder="Kısa bir düşünce…"
        />
      </label>

      {error && <p className="form__error" role="alert">{error}</p>}

      <div className="form__actions">
        <button type="submit" className="btn btn--primary">
          {editingBook ? 'Değişiklikleri Kaydet' : 'Rafa Ekle'}
        </button>
        {editingBook && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Vazgeç
          </button>
        )}
      </div>
    </form>
  );
}
