import { useState, useEffect } from "react";
import type { Product } from "../context/FavoritesContext";

// URL base de Fake Store API
const API_URL = "https://fakestoreapi.com/products";

interface UseFetchProductsProps {
  pageSize?: number; 
}

export const useFetchProducts = ({ pageSize = 4}: UseFetchProductsProps = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error al traer productos");
        const data: Product[] = await res.json();
        setProducts(data);

        // calcular total de páginas
        setTotalPages(Math.ceil(data.length / pageSize));
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [pageSize]);

  // Obtener productos de la página actual
  const paginatedProducts = products.slice((page - 1) * pageSize, page * pageSize);

  return {
    products: paginatedProducts,
    loading,
    error,
    page,
    totalPages,
    setPage,
  };
};
