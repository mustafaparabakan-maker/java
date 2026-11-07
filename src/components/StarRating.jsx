/**
 * 5 yıldızlı puanlama. onChange verilirse tıklanabilir,
 * verilmezse sadece gösterim amaçlıdır.
 */
export default function StarRating({ value, onChange, size = 'md' }) {
  const interactive = typeof onChange === 'function';

  return (
    <div className={`stars stars--${size}`} role={interactive ? 'radiogroup' : 'img'} aria-label={`${value} / 5 puan`}>
      {[1, 2, 3, 4, 5].map((n) =>
        interactive ? (
          <button
            key={n}
            type="button"
            className={`star ${n <= value ? 'is-on' : ''}`}
            onClick={() => onChange(n === value ? 0 : n)}
            aria-label={`${n} yıldız`}
          >
            ★
          </button>
        ) : (
          <span key={n} className={`star ${n <= value ? 'is-on' : ''}`}>★</span>
        )
      )}
    </div>
  );
}
