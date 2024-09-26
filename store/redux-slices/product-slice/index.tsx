import { createSlice } from "@reduxjs/toolkit";

export const initialProductState = {
  name: "",
  amount: '',
  image: "", 
  imageFile:{},
  description:"",
  quantity:0
};


export const productSlice = createSlice({
    name: "ticketDetails",
    initialState: initialProductState,
    reducers: {
      updateName: (state, { payload }) => {
        state.name = payload;
      },
      updateImage: (state, { payload }) => {
        state.image = payload.image;
        state.imageFile = payload.imageFile; 
      },
      updateAmount: (state, { payload }) => {
        state.amount = payload;
      },
      updateQuantity: (state, { payload }) => {
        state.quantity = payload;
      },
      updateDescription: (state, { payload }) => {
        state.description= payload;
      },
      
      resetProductPage: () => initialProductState,
    },
  });
  
export const productAction = productSlice.actions;
  
  export const{updateAmount,updateDescription,updateImage,updateName,resetProductPage,updateQuantity} = productAction;