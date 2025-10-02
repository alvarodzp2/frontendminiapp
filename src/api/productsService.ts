// src/api/productsService.ts

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const API_URL = "https://fakestoreapi.com/products";

// Obtener todos los productos
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }
  const data: Product[] = await response.json();
  return data;
};

// export vacío para que TypeScript reconozca este archivo como módulo
export {};
