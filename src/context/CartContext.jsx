import { createContext, useContext, useState } from "react";

const CartContext = createContext({});

export const useCartContext = () => useContext(CartContext);

export default function CartContextProvider({ children }) {
  const [cartContent, setCartContent] = useState({
    cantidadTotal: 0,
    list: [],
    precioTotal: 0,
  });

  const addToCart = (item) => {
    if (isInCart(item)) {
      getFoundItem(item).cantidad += item.cantidad;
      setCartContent({
        cantidadTotal: cartContent.cantidadTotal + item.cantidad,
        list: [...cartContent.list],
        precioTotal: cartContent.precioTotal + item.cantidad * item.item.price,
      });
    } else {
      setCartContent({
        cantidadTotal: cartContent.cantidadTotal + item.cantidad,
        list: [...cartContent.list, item],
        precioTotal: cartContent.precioTotal + item.cantidad * item.item.price,
      });
    }
  };

  const removeFromCart = (item) => {
    const index = cartContent.list.findIndex((e) => e.item.id === item.item.id);
    cartContent.list.splice(index, 1);
    setCartContent({
      cantidadTotal: cartContent.cantidadTotal - item.cantidad,
      list: [...cartContent.list],
      precioTotal: cartContent.precioTotal + item.cantidad * item.item.price,
    });
  };

  const cleanCart = () => {
    setCartContent({
      cantidadTotal: 0,
      list: [],
      precioTotal: 0,
    });
  };

  const isInCart = (item) => {
    const found = getFoundItem(item);
    return !!found;
  };

  const getFoundItem = (item) =>
    cartContent.list.find((i) => i.item.id === item.item.id);

  return (
    <CartContext.Provider
      value={{
        cartContent,
        addToCart,
        removeFromCart,
        cleanCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
