import { NavLink, Route, Routes } from "react-router-dom";
import MenuPage from "./features/menu/pages/MenuPage";
import DishDetailPage from "./features/menu/pages/DishDetailPage";
import OrderPage from "./features/menu/pages/OrderPage";

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/" aria-label="CampusEats home">
          <span className="brand-mark">CE</span>
          <span>CampusEats</span>
        </NavLink>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>Menu</NavLink>
          <NavLink to="/order">Place Order</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/dish/:id" element={<DishDetailPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="*" element={
            <section className="status-panel">
              <p className="eyebrow">404 error</p>
              <h1>Page not found</h1>
              <p>The requested page does not exist.</p>
              <NavLink className="button-link" to="/">Return to menu</NavLink>
            </section>
          } />
        </Routes>
      </main>

      <footer>CampusEats Dashboard · SE3090 Lab 02</footer>
    </div>
  );
}
