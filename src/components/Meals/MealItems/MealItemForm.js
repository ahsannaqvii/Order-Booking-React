import React, { useRef, useState } from "react";
import Input from "../../UI/Input/Input";
import classes from "./MealItemForm.module.css";
function MealItemForm(props) {
  const amountInputRef = useRef();
  const [amountValid, setamountValid] = useState(true);
  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount; //converted to _isInteger

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setamountValid(false);
      return;
    }
    props.addToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        //custom compo hai INput tou fowrad ref banane parenge in custom compo .js file
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1", //validation
          max: "5", //validation
          step: "1", //validation
          defaultValue: "1", //validation
        }}
      />
      <button>+Add</button>
      {!amountValid && <p>Enter a valid amount!</p>}
    </form>
  );
}

export default MealItemForm;
