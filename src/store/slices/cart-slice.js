import { createSlice } from "@reduxjs/toolkit";

const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
    name: "cart",
    initialState: storedCart, 
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(state));
        },
        removeFromCart: (state, action) => {
            const updatedCart = state.filter(item => item.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        }
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
