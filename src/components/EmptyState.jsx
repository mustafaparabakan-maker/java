export default function EmptyState({ title, text }) {
  return (
    <div className="empty">
      <div className="empty__shelf" aria-hidden="true">
        <span /><span /><span />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
