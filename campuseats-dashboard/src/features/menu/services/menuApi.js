// API base URL comes from the environment (set VITE_API_URL on Vercel).
// Falls back to the local API for development.
export const API = import.meta.env.VITE_API_URL || "http://localhost:5100";
export const MENU_URL = `${API}/api/menu`;

export async function getMenu() {
  const response = await fetch(MENU_URL);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
