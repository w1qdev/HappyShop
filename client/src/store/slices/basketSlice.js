import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  basket: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItemToBasket(state, action) {
      state.basket.push(action.payload)
    },

    removeItemFromBasket(state, action) {
      state.basket = state.basket.filter(item => item.id !== action.payload.id)
      console.log(state.basket)
    },

    clearBasket(state) {
      state.basket = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { addItemToBasket, removeItemFromBasket, clearBasket } = basketSlice.actions
export default basketSlice.reducer