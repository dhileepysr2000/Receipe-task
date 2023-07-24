import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import { trpc } from './index';
// import Ingredients from './components/ingredients/Ingredients';
// import Recipes from './components/recipes/Recipes';
import Top from './components/layout/Top';
import Food from './components/meals/Food';
import CartProvider from './store/CartProvider';
import Cart from './components/card/Card';
import './App.css'



function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <>
     <div className="body">
     <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      < Top onShowCart={showCartHandler} />
        <Food />
    </CartProvider>
    </div>
    </>
  );
}

export default App
