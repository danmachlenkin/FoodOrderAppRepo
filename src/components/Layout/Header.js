import React from "react";

//JS imports    
import HeaderCartButton from "./HeaderCartButton";


import mealsImg from "../../assets/meals_img.jpeg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="picutre of table with food" />
      </div>
    </React.Fragment>
  );
};

export default Header;
