import { useContext } from "react";
import { FavoritesContext, Product } from "../context/FavoritesContext";
import "../styles/ProductCard.css";

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
}

export const ProductCard = ({ product, onView }: ProductCardProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

  const handleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} loading="lazy" />
      <h3>{product.title}</h3>
      <p>${product.price.toFixed(2)}</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
        <button
          onClick={handleFavorite}
          aria-label={isFavorite(product.id) ? "Eliminar de favoritos" : "Agregar a favoritos"}
        >
          {isFavorite(product.id) ? "Favorito" : "Agregar"}
        </button>

        <button onClick={() => onView(product)} aria-label="Ver detalle">
          Ver
        </button>
      </div>
    </div>
  );
};
