import React, { useRef ,useState } from "react";
import classes from './Checkout.module.css'

const isEmpty=(value)=>value.trim() ==='';

const isFiveChars=(value)=>value.trim().length ===5 ;



const CheckoutPage = (props) => {
    const [formInputIsValid, setFormInputIsValid] = useState({
        name:true,
        street:true,
        city:true,
        postalCode:true,
    });

    const nameInputRef = useRef();
    const StreetInputRef = useRef();
    const PostalCodeInputRef = useRef();
    const CityInputRef = useRef();



  const formHandler = (event) => {
      event.preventDefault();

      const enteredName=nameInputRef.current.value;
      const enteredCity=CityInputRef.current.value;
      const enteredPostal=PostalCodeInputRef.current.value;
      const enteredStreet=StreetInputRef.current.value;

      const enteredNameIsValid=!isEmpty(enteredName);
      const enteredCityIsValid=!isEmpty(enteredCity);
      const enteredStreetIsValid=!isEmpty(enteredStreet);
      const enteredPostalIsValid=!isFiveChars(enteredPostal);

      const formIsValid=enteredNameIsValid && enteredPostalIsValid &&enteredStreetIsValid && enteredCityIsValid

        setFormInputIsValid({
            name:enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid ,
            postalCode: enteredPostalIsValid,
        })
        
      if(!formIsValid){
          return;
      }
 
      props.onConfirm({
        name:enteredName,
        street: enteredStreet,
        city: enteredCity ,
        postalCode: enteredPostal,
      })
  };
  const nameControlClasses=`${classes.control} ${formInputIsValid.name ? '' : classes.invalid}`;
  
  const streetControlClasses=`${classes.control} ${formInputIsValid.street ? '' : classes.invalid}`;
  
  const CodeControlClasses=`${classes.control} ${formInputIsValid.postalCode ? '' : classes.invalid}`;
  
  const CityControlClasses=`${classes.control} ${formInputIsValid.city ? '' : classes.invalid}`;
  
  
  return (
    <form className={classes.form} onSubmit={formHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name'  ref = {nameInputRef} />
      </div>
      {!formInputIsValid.name && <p>Please enter a valid name!</p>}
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref = {StreetInputRef}  />
      </div>
      {!formInputIsValid.street && <p>Please enter a valid street!</p>}
      <div className={CodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref = {PostalCodeInputRef} />
      </div>
      {!formInputIsValid.postalCode && <p>Please enter a valid postal code!</p>}
      <div className={CityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref = {CityInputRef} />
      </div>
      {!formInputIsValid.city && <p>Please enter a valid city!</p>}
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckoutPage;
