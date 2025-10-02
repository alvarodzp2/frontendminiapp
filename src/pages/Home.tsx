import React, { useState, useMemo } from "react";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { SearchBar } from "../components/SearchBar";
import { ProductCard } from "../components/ProductCard";
import { Product } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext"; 
import "../styles/Home.css"; 

function Home() {
  const { products, loading, error, page, totalPages, setPage } = useFetchProducts({ pageSize: 4 });

  const { theme } = useTheme();

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);
  
  const modalContentStyle: React.CSSProperties = {
      backgroundColor: theme === 'dark' ? 'var(--card-bg)' : 'white',
      color: theme === 'dark' ? 'var(--text-color)' : 'black',
      
      padding: '20px', 
      borderRadius: '8px',
      maxWidth: '400px', 
      maxHeight: '80vh', 
      overflowY: 'auto',
  };
  
  const textColorStyle: React.CSSProperties = {
      // Forzamos el color del texto a la variable del tema.
      color: theme === 'dark' ? 'var(--text-color)' : 'inherit',
  };

  return (
    <div className="home-container">

      <h1 className="title">Catálogo de Productos</h1>

      <SearchBar onSearch={setSearch} />

      {loading && <p className="info-text">Cargando productos...</p>}
      {error && <p className="info-text error">{error}</p>}
      {!loading && filteredProducts.length === 0 && (
        <p className="info-text">No hay productos.</p>
      )}

      {/* Grid de productos */}
      <div className="grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onView={setSelected} />
        ))}
      </div>

      {/* Paginación */}
      <div className="pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="page-button"
        >
          Anterior
        </button>
        <span className="page-info">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="page-button"
        >
          Siguiente
        </button>
      </div>

      {/* Modal accesible */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="modal-overlay"
          onClick={() => setSelected(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle} 
          >
            {}
            <h2 style={textColorStyle}>{selected.title}</h2>
            <img
              src={selected.image}
              alt={selected.title}
              className="modal-image"
            />
            { }
            <p style={textColorStyle}>{selected.description}</p>
            <p style={textColorStyle}>
              <strong>${selected.price.toFixed(2)}</strong>
            </p>
            <button onClick={() => setSelected(null)} className="close-button">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
