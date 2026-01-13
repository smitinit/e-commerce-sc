import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface ActionPayload {
  id: string;
  title: string;
  price: number;
}

interface CartState {
  items: CartItem[];
}
const initialState: CartState = {
  items: [
    {
      id: "1",
      title: "Sample Product",
      price: 100,
      quantity: 2,
    },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add item as well as increase quantity if already exist in cart
    addItem(state, action: PayloadAction<ActionPayload>) {
      const getExistingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (getExistingItem) {
        getExistingItem.quantity += 1;
        return;
      }
      const newItem = {
        id: action.payload.id,
        title: action.payload.title,
        price: action.payload.price,
        quantity: 1,
      };
      state.items.push(newItem);
    },

    // remove whole item from the cart
    removeItem(state, action: PayloadAction<string>) {
      if (!state.items.find((item) => item.id === action.payload)) {
        return;
      }
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // decrease item quantity by 1
    decreaseItemQuantity(state, action: PayloadAction<string>) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },

    // clear the entire cart
    clearCart(state) {
      state.items = [];
    },
  },
});

// reflect the store and actions
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export const cartActions = cartSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

// legacy old way
// const cartCounter = (
//   state: { items: number } = initialState,
//   action: { type: string }
// ) => {
//   switch (action.type) {
//     case "ADD_ITEM":
//       return { items: state.items + 1 };
//     case "REMOVE_ITEM":
//       return { items: state.items > 0 ? state.items - 1 : 0 };
//     default:
//       return state;
//   }
// };
