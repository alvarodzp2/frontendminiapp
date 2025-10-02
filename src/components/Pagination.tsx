// src/components/Pagination.tsx
import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        Anterior
      </button>
      <span style={{ margin: "0 12px" }}>
        Página {page} de {totalPages}
      </span>
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
        Siguiente
      </button>
    </div>
  );
};

// export vacío para que TypeScript reconozca el archivo como módulo
export {};
