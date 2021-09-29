import React, { useReducer } from "react";
import AuthContext2 from "./auth-context2";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    
    // LOGIC FOR HAVING A SINGLE ROW FOR SAME ITEMS
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    
    let updatedItems;

    if (existingCartItem) {
        const updatedItem={
          ...existingCartItem,
          amount:action.item.amount + existingCartItem.amount
        }
        updatedItems=[...state.items]
        updatedItems[existingCartItemIndex]=updatedItem
    }
    else{
       updatedItems = state.items.concat(action.item);
    }
 
//concat returns  a new array whereas .push purani array mai hi daldeta
   
    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
  } 
   if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount=state.totalAmount-existingItem.price;
    let updatedItems; 
    if(existingItem.amount===1){
      //this gives a new array keh jismai action.id ke ilawa saarey elements hunge apni jaga  
      updatedItems=state.items.filter(item=>item.id!==action.id);
    }
    else{
      const updatedItem={...existingItem, amount: existingItem.amount-1}
      updatedItems=[...state.items];  
      updatedItems[existingCartItemIndex]=updatedItem;
    }
    return{
      items:updatedItems,
      totalAmount:updatedTotalAmount
    }
  } 
   
  if(action.type==='CLEAR_ENTIRE_CART'){
    return defaultCartState;;
  }
    return defaultCartState;
  
};
function CartProvider(props) {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemHandler = (item) => {
    dispatchCartState({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartState({ type: "REMOVE", id: id });
  };
  const clearCartHandler=()=>{
    dispatchCartState({type:'CLEAR_ENTIRE_CART'});
  }
  const cartContext = {
    totalAmount: cartState.totalAmount,
    items: cartState.items,
    addItem: addItemHandler,
    removeItem: removeItemFromCartHandler,
    clearCart:clearCartHandler
  };
  return (
    <AuthContext2.Provider value={cartContext}>
      {props.children}
    </AuthContext2.Provider>
  );
}

export default CartProvider;
