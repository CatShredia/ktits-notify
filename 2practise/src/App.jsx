import "./App.css";
import "./assets/style.css";

import { BrowserRouter, Routes, Route, Link } from "react-router";

import Header from './includes/header'
import Main from './includes/main'
import Home from './pages/Home'
import Catalog from './pages/Catalog'

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
      </Routes>
    </>

  );
}
export default App;