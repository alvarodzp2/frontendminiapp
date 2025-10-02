import { useTheme } from "../context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        position: "absolute",
        top: "16px",
        right: "16px",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "2px solid #ccc",
        cursor: "pointer",
        backgroundColor: theme === "light" ? "#f0f0f0" : "#333333",
        color: theme === "light" ? "#000000" : "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        transition: "all 0.3s ease",
      }}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};
