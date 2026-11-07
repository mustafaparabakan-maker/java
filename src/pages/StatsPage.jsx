import { useMemo } from 'react';
import StarRating from '../components/StarRating.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { STATUSES } from '../interfaces/book.js';

export default function StatsPage({ books }) {
  const stats = useMemo(() => {
    const byStatus = { okunacak: 0, okunuyor: 0, okundu: 0 };
    let pagesRead = 0;
    let ratingSum = 0;
    let ratedCount = 0;

    books.forEach((b) => {
      byStatus[b.status] += 1;
      pagesRead += Number(b.currentPage) || 0;
      if (b.rating > 0) {
        ratingSum += b.rating;
        ratedCount += 1;
      }
    });

    const favorites = books
      .filter((b) => b.rating > 0)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);

    return {
      byStatus,
      pagesRead,
      avgRating: ratedCount ? (ratingSum / ratedCount).toFixed(1) : '–',
      favorites
    };
  }, [books]);

  if (books.length === 0) {
    return <EmptyState title="Henüz istatistik yok" text="Kitap ekledikçe burası dolacak." />;
  }

  const total = books.length;

  return (
    <div className="stats">
      <div className="stat-grid">
        <div className="stat">
          <span className="stat__value">{total}</span>
          <span className="stat__label">Toplam kitap</span>
        </div>
        <div className="stat">
          <span className="stat__value">{stats.byStatus.okundu}</span>
          <span className="stat__label">Bitirilen</span>
        </div>
        <div className="stat">
          <span className="stat__value">{stats.pagesRead.toLocaleString('tr-TR')}</span>
          <span className="stat__label">Okunan sayfa</span>
        </div>
        <div className="stat">
          <span className="stat__value">{stats.avgRating}</span>
          <span className="stat__label">Ortalama puan</span>
        </div>
      </div>

      <div className="panel">
        <h2 className="panel__title">Raf dağılımı</h2>
        <div className="shelf-bar" role="img" aria-label="Durumlara göre kitap dağılımı">
          {STATUSES.map((s) =>
            stats.byStatus[s.value] > 0 ? (
              <div
                key={s.value}
                className={`shelf-bar__part shelf-bar__part--${s.value}`}
                style={{ flexGrow: stats.byStatus[s.value] }}
              />
            ) : null
          )}
        </div>
        <ul className="legend">
          {STATUSES.map((s) => (
            <li key={s.value}>
              <span className={`legend__dot legend__dot--${s.value}`} />
              {s.label} <strong>{stats.byStatus[s.value]}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="panel">
        <h2 className="panel__title">En sevdiklerin</h2>
        {stats.favorites.length === 0 ? (
          <p className="muted">Puan verdiğin kitaplar burada listelenir.</p>
        ) : (
          <ol className="favorites">
            {stats.favorites.map((b) => (
              <li key={b.id}>
                <div>
                  <strong>{b.title}</strong>
                  {b.author && <span className="muted"> · {b.author}</span>}
                </div>
                <StarRating value={b.rating} size="sm" />
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
