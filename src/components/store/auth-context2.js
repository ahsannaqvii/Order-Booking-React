import React from "react";

const AuthContext2 = React.createContext({
  totalAmount: 0,
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});
//often it will be an object
//Auth context is an object that will contain a component
export default AuthContext2;
