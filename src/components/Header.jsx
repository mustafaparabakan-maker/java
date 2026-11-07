export default function Header({ page, onNavigate, bookCount }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true">
            <span /><span /><span />
          </span>
          <div>
            <h1 className="brand__name">Rafım</h1>
            <p className="brand__tagline">{bookCount} kitap rafta</p>
          </div>
        </div>

        <nav className="nav" aria-label="Sayfalar">
          <button
            className={`nav__link ${page === 'library' ? 'is-active' : ''}`}
            onClick={() => onNavigate('library')}
          >
            Kitaplarım
          </button>
          <button
            className={`nav__link ${page === 'stats' ? 'is-active' : ''}`}
            onClick={() => onNavigate('stats')}
          >
            İstatistikler
          </button>
        </nav>
      </div>
    </header>
  );
}
