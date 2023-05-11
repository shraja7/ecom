export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //calcualte items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  //calculate shipping price (if ordder is over $100, shipping is free, else shipping is $100)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100);
  //calcualte tax price (tax is 15% of items price)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
  //calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  //save cart to local storage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
