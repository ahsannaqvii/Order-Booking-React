import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import { useState } from "react";
import AuthContext from "./components/store/auth-context";
import CartProvider from "./components/store/CartProvider";
function App() {
  const [cartisShown, setCartisShown] = useState(false);
  const showCartHandler = () => {
    setCartisShown(true);
  };
  const hideCartHandler = () => {
    setCartisShown(false);
  };
  return (
    <CartProvider>
      <AuthContext.Provider
        value={{ cartShown: showCartHandler, cartHidden: hideCartHandler }}
      >
        {cartisShown && <Cart closeCart={hideCartHandler} />}
        <Header />
      </AuthContext.Provider>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
