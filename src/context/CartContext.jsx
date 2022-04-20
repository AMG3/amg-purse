import { createContext, useContext, useState } from "react";

const CartContext = createContext({});

export const useCartContext = () => useContext(CartContext);

export default function CartContextProvider({ children }) {
  const [cartContent, setCartContent] = useState({
    totalQuantity: 0,
    list: [],
    totalPrice: 0,
  });

  const addToCart = (item) => {
    if (isInCart(item)) {
      getFoundItem(item).quantity += item.quantity;
      setCartContent({
        totalQuantity: cartContent.totalQuantity + item.quantity,
        list: [...cartContent.list],
        totalPrice: cartContent.totalPrice + item.quantity * item.item.price,
      });
    } else {
      setCartContent({
        totalQuantity: cartContent.totalQuantity + item.quantity,
        list: [...cartContent.list, item],
        totalPrice: cartContent.totalPrice + item.quantity * item.item.price,
      });
    }
  };

  const removeFromCart = (item) => {
    const index = cartContent.list.findIndex((e) => e.item.id === item.item.id);
    cartContent.list.splice(index, 1);
    setCartContent({
      totalQuantity: cartContent.totalQuantity - item.quantity,
      list: [...cartContent.list],
      totalPrice: cartContent.totalPrice + item.quantity * item.item.price,
    });
  };

  const cleanCart = () => {
    setCartContent({
      totalQuantity: 0,
      list: [],
      totalPrice: 0,
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
