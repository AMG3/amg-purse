import { createContext, useContext, useState } from "react";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

export default function CartContextProvider({ children }) {
  const [cartList, setCartList] = useState([]);

  const addToCart = (item) => {
    if (isInCart(item)) {
      getFoundItem(item).cantidad += item.cantidad;
    } else {
      setCartList([...cartList, item]);
    }
  };

  const removeCart = () => {
    setCartList([]);
  };

  const isInCart = (item) => {
    const found = getFoundItem(item);
    return !!found;
  };

  const getFoundItem = (item) =>
    cartList.find((i) => i.item.id === item.item.id);

  return (
    <CartContext.Provider
      value={{
        cartList,
        addToCart,
        removeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
