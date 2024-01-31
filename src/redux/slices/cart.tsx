import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface cartStates {
  itemsCart: { title: string,
    price: number,
    imageUrl: string,
    types: number,
    sizes: number,
    id: string,
    count: number}[],
  totalPrice: number,
  totalCount: number
}

type typesItemCart = { 
  title: string,
  price: number,
  imageUrl: string,
  types: number,
  sizes: number,
  id: string,
  count?: number
}

const initialState:cartStates = {
  totalPrice: 0,
  totalCount: 0,
  itemsCart: [],
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<typesItemCart>) {
      const findIdenticalItem = state.itemsCart.find(
        (item) =>
          item.id === action.payload.id &&
          item.sizes === action.payload.sizes &&
          item.types === action.payload.types
      );
      if (findIdenticalItem) {
        findIdenticalItem.count++;
      } else {
        state.itemsCart.push({ ...action.payload, count: 1 });
      }
    },
    addItemsFromLocalStorage (state, action){
      state.itemsCart = action.payload;
    },
    setTotalPrice(state) {
      state.totalPrice = state.itemsCart.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
    },

    setTotalCount(state) {
      state.totalCount = state.itemsCart.reduce(
        (acc, item) => acc + item.count,
        0
      );
    },

    deleteItem(state, action: PayloadAction<number>) {
      state.itemsCart = state.itemsCart.filter(
        (item, index) => index !== action.payload
      );
    },

    clearCart(state) {
      state.itemsCart = [];
    },

    minusCount(state, action: PayloadAction<number>) {
      const findItem = state.itemsCart.find(
        (item, index) => index === action.payload
      );
      if (findItem && findItem.count > 1) {
        findItem.count--;
      } else
        state.itemsCart = state.itemsCart.filter(
          (item, index) => index !== action.payload
        );
    },
    plusCount(state, action: PayloadAction<number>) {
      const findItem = state.itemsCart.find(
        (item, index) => index === action.payload
      );
      findItem && findItem.count++
    },
  },
});

export const {
  addItemToCart,
  setTotalPrice,
  setTotalCount,
  deleteItem,
  clearCart,
  minusCount,
  plusCount,
  addItemsFromLocalStorage
} = cart.actions;

export default cart.reducer;
