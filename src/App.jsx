import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ItemListContainer from "./container/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./container/ItemDetailContainer/ItemDetailContainer";

import Cart from "./components/Cart";
import CartContextProvider from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route
            path="/contacto/:contactenos"
            element={<ItemListContainer />}
          />

          <Route path="/category/:categoryId" element={<ItemListContainer />} />

          <Route path="/detail/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartContextProvider>
    </BrowserRouter>
  );
}

export default App;
