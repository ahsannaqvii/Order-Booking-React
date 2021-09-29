import React, { useContext, useEffect, useState } from "react";
import { BiCart } from "react-icons/bi";
import AuthContext from "../store/auth-context";
import AuthContext2 from "../store/auth-context2";
import classes from "./HeaderCart.module.css";

function HeaderCartButton() {
  const [BtnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const contextData = useContext(AuthContext);
  const cartData = useContext(AuthContext2);
  const { items } = cartData;
  //this reduce method converts array into single ement
  const numberOfCartItems = cartData.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    return ()=>{
      clearTimeout(timer);
    }
  }, [items]);


  const btnClasses = `${classes.button} ${
    BtnIsHighlighted ? classes.bump : ""
  }`;


  return (
    <button className={btnClasses} onClick={contextData.cartShown}>
      <span className={classes.icon}>
        <BiCart />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
