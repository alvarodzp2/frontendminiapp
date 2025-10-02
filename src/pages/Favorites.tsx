import { useContext, useState } from "react";
import React from "react"; // Necesario para el tipado y JSX
import { FavoritesContext, Product } from "../context/FavoritesContext";
// Eliminamos la importación de Modal, ya que la implementaremos directamente.
// import { Modal } from "../components/Modal"; 

// 1. Importar useTheme
import { useTheme } from "../context/ThemeContext"; 

export const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const [selected, setSelected] = useState<Product | null>(null);
  
  // 2. Obtener el tema actual
  const { theme } = useTheme();

  // 3. Estilos condicionales para el texto y el contenedor del modal
  // Esta es exactamente la misma lógica que funciona en Home.tsx
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
      color: theme === 'dark' ? 'var(--text-color)' : 'inherit',
  };


  if (favorites.length === 0) return <p>No tienes productos favoritos.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Favoritos</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        {favorites.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "12px" }}>
            <h3>{product.title}</h3>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
            />
            <p>${product.price.toFixed(2)}</p>
            <div style={{ display: "flex", gap: "8px" }}>
              {/* Usamos el mismo botón para abrir la modal */}
              <button onClick={() => setSelected(product)}>Ver detalle</button>
              <button onClick={() => removeFavorite(product.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. MODAL PERSONALIZADA (Como en Home.tsx) */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="modal-overlay"
          onClick={() => setSelected(null)}
          // Estilos para centrar la modal, si tu CSS no lo hace:
          style={{
             position: 'fixed',
             inset: 0,
             backgroundColor: 'rgba(0, 0, 0, 0.6)',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             zIndex: 999,
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            // Aplicar el estilo condicional de fondo y color
            style={modalContentStyle}
          >
            {/* Aplicar color a los elementos de texto */}
            <h2 style={textColorStyle}>{selected.title}</h2>
            <img
              src={selected.image}
              alt={selected.title}
              className="modal-image"
            />
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
};