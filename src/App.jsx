import { useState } from 'react';
import Header from './components/Header.jsx';
import LibraryPage from './pages/LibraryPage.jsx';
import StatsPage from './pages/StatsPage.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { SAMPLE_BOOKS } from './interfaces/book.js';

function createId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function App() {
  const [books, setBooks] = useLocalStorage('rafim-books', SAMPLE_BOOKS);
  const [page, setPage] = useState('library');

  // EKLE
  function addBook(data) {
    const book = { ...data, id: createId(), createdAt: new Date().toISOString() };
    setBooks((prev) => [book, ...prev]);
  }

  // GÜNCELLE
  function updateBook(id, data) {
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
  }

  // SİL
  function deleteBook(id) {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <div className="app">
      <Header page={page} onNavigate={setPage} bookCount={books.length} />
      <main className="container">
        {page === 'library' ? (
          <LibraryPage books={books} onAdd={addBook} onUpdate={updateBook} onDelete={deleteBook} />
        ) : (
          <StatsPage books={books} />
        )}
      </main>
      <footer className="footer">Rafım · React ile okuma takibi</footer>
    </div>
  );
}
