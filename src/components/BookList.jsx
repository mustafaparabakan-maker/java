import BookCard from './BookCard.jsx';
import EmptyState from './EmptyState.jsx';

export default function BookList({ books, editingId, onEdit, onDelete, hasAnyBook }) {
  if (books.length === 0) {
    return (
      <EmptyState
        title={hasAnyBook ? 'Eşleşen kitap yok' : 'Rafın henüz boş'}
        text={hasAnyBook ? 'Filtreyi veya aramayı değiştirmeyi dene.' : 'Formu kullanarak ilk kitabını ekle.'}
      />
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isEditing={book.id === editingId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
