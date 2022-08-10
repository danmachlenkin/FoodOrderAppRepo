import React, {useContext , useEffect , useState} from "react";

//JS imports
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [isBumpClassActive, setIsBumpClassActive] = useState(false);
  const {items} = cartCtx;

  const numberOfCartItems = items.reduce((curNum , item)=> {
    return curNum + item.amount;
  } , 0)
  
  let btnClasses = `${classes.button} ${isBumpClassActive ? classes.bump : '' }`;

  useEffect(()=> {

    if(items.length === 0 ){
      return;
    }
    
    setIsBumpClassActive(true);

    let timer = setTimeout(()=>{
      setIsBumpClassActive(false);
    },300)

    return () => {
      clearTimeout(timer);
    }

  } , [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}> {numberOfCartItems} </span>
    </button>
  );
};

export default HeaderCartButton;
