import { useState, ChangeEvent, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [input, setInput] = useState("");
  const debouncedValue = useDebounce(input, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    onSearch(debouncedValue.trim().toLowerCase());
  }, [debouncedValue, onSearch]);

  return (
    <div style={{ marginBottom: "1rem", textAlign: "center" }}>
      <input
        type="text"
        placeholder="Buscar productos"
        value={input}
        onChange={handleChange}
        style={{
          padding: "8px",
          width: "250px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export {};