import { useMemo, useState } from 'react';
import BookForm from '../components/BookForm.jsx';
import FilterBar from '../components/FilterBar.jsx';
import BookList from '../components/BookList.jsx';

export default function LibraryPage({ books, onAdd, onUpdate, onDelete }) {
  const [editingBook, setEditingBook] = useState(null);
  const [filter, setFilter] = useState('tumu');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('yeni');

  // Her durumdaki kitap sayısı (filtre sekmelerinde gösterilir)
  const counts = useMemo(() => {
    const c = { tumu: books.length, okunacak: 0, okunuyor: 0, okundu: 0 };
    books.forEach((b) => { c[b.status] += 1; });
    return c;
  }, [books]);

  // LİSTELE: filtrele → ara → sırala
  const visibleBooks = useMemo(() => {
    const q = search.trim().toLocaleLowerCase('tr');

    return books
      .filter((b) => filter === 'tumu' || b.status === filter)
      .filter((b) =>
        !q ||
        b.title.toLocaleLowerCase('tr').includes(q) ||
        b.author.toLocaleLowerCase('tr').includes(q)
      )
      .sort((a, b) => {
        if (sort === 'baslik') return a.title.localeCompare(b.title, 'tr');
        if (sort === 'puan') return b.rating - a.rating;
        return b.createdAt.localeCompare(a.createdAt);
      });
  }, [books, filter, search, sort]);

  function handleSubmit(data) {
    if (editingBook) {
      onUpdate(editingBook.id, data);
      setEditingBook(null);
    } else {
      onAdd(data);
    }
  }

  function handleEdit(book) {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleDelete(id) {
    if (editingBook?.id === id) setEditingBook(null);
    onDelete(id);
  }

  return (
    <div className="library">
      <aside className="library__side">
        <BookForm
          editingBook={editingBook}
          onSubmit={handleSubmit}
          onCancel={() => setEditingBook(null)}
        />
      </aside>

      <section className="library__main">
        <FilterBar
          filter={filter}
          onFilter={setFilter}
          search={search}
          onSearch={setSearch}
          sort={sort}
          onSort={setSort}
          counts={counts}
        />
        <BookList
          books={visibleBooks}
          editingId={editingBook?.id}
          onEdit={handleEdit}
          onDelete={handleDelete}
          hasAnyBook={books.length > 0}
        />
      </section>
    </div>
  );
}
