import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { BsFillCartFill } from "react-icons/bs";
import { useCartContext } from "../../context/CartContext";

const CartWidget = () => {
  const { cartContent } = useCartContext();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cartContent.totalQuantity);
  }, [cartContent]);

  return (
    <div>
      {cartContent.list.length <= 0 ? (
        <></>
      ) : (
        <>
          <BsFillCartFill />
          <Badge pill bg="success">
            {total}
          </Badge>{" "}
        </>
      )}
    </div>
  );
};

export default CartWidget;
