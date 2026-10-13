export default function Button({ children, type = "button", className = "", ...props }) {
  return (
    <button type={type} className={`primary-button ${className}`} {...props}>
      {children}
    </button>
  );
}
