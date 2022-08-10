import React, {useState} from "react";
//JS imports
import Cart from "./components/Cart/Cart";
import Meals from "./components/Meals/Meals";
import Header from "./components/Layout/Header";
import CartProvider from "./store/CartProvider";

function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  const showCartHandler = ()=>{
    setIsCartShown(true);
  };

  const hideCartHandler = ()=> {
    setIsCartShown(false);
  };

  return (
    <CartProvider>
     {isCartShown && <Cart onCloseCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
