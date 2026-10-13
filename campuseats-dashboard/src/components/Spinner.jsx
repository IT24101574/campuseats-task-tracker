export default function Spinner({ label = "Loading..." }) {
  return (
    <div className="status-panel" role="status">
      <span className="spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}
