import { STATUSES } from '../interfaces/book.js';

export default function FilterBar({ filter, onFilter, search, onSearch, sort, onSort, counts }) {
  const tabs = [{ value: 'tumu', label: 'Tümü' }, ...STATUSES];

  return (
    <div className="filterbar">
      <div className="chips" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.value}
            role="tab"
            aria-selected={filter === t.value}
            className={`chip ${filter === t.value ? 'is-active' : ''}`}
            onClick={() => onFilter(t.value)}
          >
            {t.label}
            <span className="chip__count">{counts[t.value] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="filterbar__tools">
        <input
          className="search"
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Kitap veya yazar ara…"
          aria-label="Ara"
        />
        <select value={sort} onChange={(e) => onSort(e.target.value)} aria-label="Sırala">
          <option value="yeni">En yeni</option>
          <option value="baslik">Ada göre (A-Z)</option>
          <option value="puan">Puana göre</option>
        </select>
      </div>
    </div>
  );
}
