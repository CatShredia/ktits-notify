import "./App.css";
import "./assets/style.css";

import { BrowserRouter, Routes, Route, Link } from "react-router";

import Header from './includes/header'
import Main from './includes/main'
import Home from './pages/Home'
import About from './pages/About'
import Catalog from './pages/Catalog'
import Product from './pages/Product'

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="catalog/:id" element={<Product />} />
        <Route path="about" element={<About />} />
      </Routes>
    </>

  );
}
export default App;