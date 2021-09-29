import React from "react";

const AuthContext = React.createContext({
  cartShown: () => {},
  cartHidden: () => {},
});
//often it will be an object
//Auth context is an object that will contain a component
export default AuthContext;
