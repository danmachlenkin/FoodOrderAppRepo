import React, { useContext, useState } from "react";

//JS imports
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
//CSS imports
import classes from "./Cart.module.css";

const Cart = (props) => {
  const [didOrderSubmitted, setDidOrderSubmitted] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const cartTotalAmount = `${cartCtx.totalAmount.toFixed(2)}₪`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const confirmOrderHandler = async (userData) => {
    await fetch(
      "https://food-order-app-460d6-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          items: cartCtx.items,
        }),
      }
    );
    setDidOrderSubmitted(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={Math.random()}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onCloseCart} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartTotalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={confirmOrderHandler}
          onCancle={props.onCloseCart}
        />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const showOrderSubmittionMessage = (
    <React.Fragment>
      <p>Order Has Sucessfully Submitted!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      {!didOrderSubmitted && modalContent}
      {didOrderSubmitted && showOrderSubmittionMessage}
    </Modal>
  );
};

export default Cart;
