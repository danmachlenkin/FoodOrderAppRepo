import React , {useRef, useState} from 'react';

//CSS imports
import classes from './Checkout.module.css';


const isEmpty = input => input.trim() === '';
const isFiveChars = postalCode => postalCode.trim().length === 5;

const Checkout = (props) => {
    const [formValidity , setFormValidity] = useState({
      name: true,
      street: true,
      postalCode: true,
      city: true,
    })

    const nameRef = useRef();
    const streetRef = useRef();
    const postalCodeRef = useRef();
    const cityRef = useRef();




  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostalCode = postalCodeRef.current.value;
    const enteredCity = cityRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormValidity({
      name:enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    })

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;

    if(!formIsValid){
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity
    })
  };

  const nameControlClasses = `${classes.control} ${formValidity.name ? '' : classes.invalid}`;
  const streetControlClasses = `${classes.control} ${formValidity.street ? '' : classes.invalid}`
  const cityControlClasses = `${classes.control} ${formValidity.city ? '' : classes.invalid}`
  const postalCodeControlClasses = `${classes.control} ${formValidity.postalCode ? '' : classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef}/>
        {!formValidity.name && <p>Please enter a name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef}/>
        {!formValidity.street && <p>Please enter a street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeRef}/>
        {!formValidity.postalCode && <p>Please enter a correct postal code! (5 characters)</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef}/>
        {!formValidity.city && <p>Please enter a city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancle}>
          Cancel
        </button>
        <button className={classes.submit} onClick={confirmHandler}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;