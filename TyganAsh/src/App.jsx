import HomePage from "./pages/HomePage"
import CatalogPage from "./pages/CatalogPage"

import { BrowserRouter, Routes, Route, Link } from "react-router";
import Header from "./pages/includes/Header";
import Footer from "./pages/includes/Footer";

import "./assets/main.css";

function App() {
  return (
    <body className="body">
      <Header></Header>

      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
        </Routes>
      </main>

      <Footer></Footer>
    </body>
  )
}

export default App
