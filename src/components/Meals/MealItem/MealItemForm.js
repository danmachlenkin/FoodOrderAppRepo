import React , {useRef , useState} from "react";

//JS imports
import Input from "../../UI/Input";

//CSS imports
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {

    const [enteredAmountIsValid, setEnteredAmountIsValid] = useState(true);

    const inputAmountRef = useRef();

const submitHandler = event => {
    event.preventDefault();

    const enteredAmount = inputAmountRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim() === 0 || enteredAmountNumber <1 || enteredAmount > 5){
        setEnteredAmountIsValid(false);
        return;
    }

    props.onAddItemToCart(enteredAmountNumber);


}

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        ref={inputAmountRef}
        input={{
          id: "amount_" + Math.random(),
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ add</button>
      {!enteredAmountIsValid && <p>Please Enter A Valid Amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
