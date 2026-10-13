import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import MenuList from "../components/MenuList";
import SearchBar from "../components/SearchBar";
import Spinner from "../../../components/Spinner";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import { MENU_URL } from "../services/menuApi";

function MenuPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const debouncedQuery = useDebounce(query, 400);
  const { data: dishes, isLoading, error } = useFetch(MENU_URL);

  if (isLoading) return <Spinner label="Loading menu..." />;
  if (error) {
    return (
      <section className="status-panel error-panel">
        <p className="eyebrow">Unable to load</p>
        <h1>Could not load the menu</h1>
        <p>{error}. Please refresh the page and try again.</p>
      </section>
    );
  }

  const filtered = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
  );

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Fresh meals on campus</p>
          <h1>CampusEats Dashboard</h1>
          <p>Browse the daily menu and place your order before the next lecture.</p>
        </div>
        <div className="hero-stat">
          <strong>{dishes.filter((dish) => dish.available).length}</strong>
          <span>dishes available now</span>
        </div>
      </section>

      <section className="menu-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Today’s selection</p>
            <h2>Campus menu</h2>
          </div>
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <MenuList dishes={filtered} />
      </section>
    </>
  );
}

export default MenuPage;
