import { Link } from "react-router-dom";

function DishCard({ dish }) {
  return (
    <article className={`dish-card ${!dish.available ? "unavailable" : ""}`}>
      <div className="dish-card-top">
        <span className="category">{dish.category}</span>
        {!dish.available && <span className="sold-out">Sold out</span>}
      </div>
      <h2>{dish.name}</h2>
      {dish.description && <p className="description">{dish.description}</p>}
      <div className="dish-card-bottom">
        <strong>Rs. {dish.price.toFixed(2)}</strong>
        <Link to={`/dish/${dish.id}`}>View details →</Link>
      </div>
    </article>
  );
}

export default DishCard;
