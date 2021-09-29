import React, { useContext, useState } from "react";
import CheckoutPage from "./CheckoutPage";
import AuthContext2 from "../store/auth-context2";
import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

function Cart(props) {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [didSubmit, setdidSubmit] = useState(false);
  const [showCheckout, setshowCheckout] = useState(false);
  const cartCtx = useContext(AuthContext2);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const haveItems = cartCtx.items.length > 0;

  // FUNCTION FOR HTTP REQ TO FIREBASE
  const submitOrderHandlerToDB = async (userData) => {
    setisSubmitting(true);
    await fetch(
      "https://rest-react-3af2d-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
        // headers: ,
      }
    );
    setisSubmitting(false);
    setdidSubmit(true);
    cartCtx.clearCart();
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler}
          onAdd={cartItemAddHandler}
        />
      ))}
    </ul> 
  );

  function openCheckout() {
    setshowCheckout(true);
  }

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.closeCart}>
        Close
      </button>
      {haveItems && (
        <button className={classes.button} onClick={openCheckout}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <CheckoutPage
          onCancel={props.closeCart}
          onConfirm={submitOrderHandlerToDB}
        />
      )}
      {!showCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending Order Data ...</p>;
  const didSubmitModalContent = (
    <div  className={classes.actions}>
      <p>ORDER HAS BEEN SUCCESFULLY SENT!</p>
      <button className={classes.button} onClick={props.closeCart}>
        Close
      </button>
    </div>
  );
  return (
    <Modal>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
}
export default Cart;
