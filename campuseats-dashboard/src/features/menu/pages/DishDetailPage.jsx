import { Link, useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { useFetch } from "../hooks/useFetch";
import { MENU_URL } from "../services/menuApi";

function DishDetailPage() {
  const { id } = useParams();
  const { data: dishes, isLoading, error } = useFetch(MENU_URL);

  if (isLoading) return <Spinner label="Loading dish details..." />;
  if (error) return <p className="status-panel">Could not load dish: {error}</p>;

  const dish = dishes.find((item) => item.id === Number(id));
  if (!dish) {
    return (
      <section className="status-panel">
        <h1>Dish not found</h1>
        <Link className="button-link" to="/">← Back to menu</Link>
      </section>
    );
  }

  return (
    <section className="detail-layout">
      <div className="detail-visual" aria-hidden="true">{dish.name.slice(0, 2).toUpperCase()}</div>
      <div className="detail-content">
        <p className="eyebrow">{dish.category}</p>
        <h1>{dish.name}</h1>
        {dish.description && <p>{dish.description}</p>}
        <strong className="detail-price">Rs. {dish.price.toFixed(2)}</strong>
        <p className={dish.available ? "available" : "not-available"}>
          {dish.available ? "Available to order" : "Currently sold out"}
        </p>
        <div className="detail-actions">
          <Link className="button-link" to="/order">Place an order</Link>
          <Link className="text-link" to="/">← Back to menu</Link>
        </div>
      </div>
    </section>
  );
}

export default DishDetailPage;
