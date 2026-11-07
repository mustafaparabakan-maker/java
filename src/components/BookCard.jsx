import StarRating from './StarRating.jsx';
import { STATUS_LABELS } from '../interfaces/book.js';

export default function BookCard({ book, isEditing, onEdit, onDelete }) {
  const progress =
    book.status === 'okundu'
      ? 100
      : book.pages
        ? Math.round((book.currentPage / book.pages) * 100)
        : 0;

  function handleDelete() {
    if (window.confirm(`"${book.title}" rafından kaldırılsın mı?`)) {
      onDelete(book.id);
    }
  }

  return (
    <article className={`book book--${book.status} ${isEditing ? 'is-editing' : ''}`}>
      <div className="book__spine" aria-hidden="true" />

      <div className="book__body">
        <div className="book__top">
          <span className={`badge badge--${book.status}`}>{STATUS_LABELS[book.status]}</span>
          {book.rating > 0 && <StarRating value={book.rating} size="sm" />}
        </div>

        <h3 className="book__title">{book.title}</h3>
        {book.author && <p className="book__author">{book.author}</p>}

        {book.status === 'okunuyor' && (
          <div className="progress" aria-label={`%${progress} okundu`}>
            <div className="progress__bar" style={{ width: `${progress}%` }} />
            <span className="progress__label">
              {book.currentPage} / {book.pages || '?'} sayfa · %{progress}
            </span>
          </div>
        )}

        {book.status !== 'okunuyor' && book.pages > 0 && (
          <p className="book__meta">{book.pages} sayfa</p>
        )}

        {book.note && <p className="book__note">“{book.note}”</p>}

        <div className="book__actions">
          <button className="btn btn--small" onClick={() => onEdit(book)}>Düzenle</button>
          <button className="btn btn--small btn--danger" onClick={handleDelete}>Sil</button>
        </div>
      </div>
    </article>
  );
}
