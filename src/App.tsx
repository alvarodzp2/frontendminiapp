import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeToggle } from "./components/ThemeToggle";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { Favorites } from "./pages/Favorites";
function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Router>
          <header style={{ padding: "16px", position: "relative" }}>
            <NavBar />
            <ThemeToggle />
          </header>

          <main style={{ padding: "16px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
