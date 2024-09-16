import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialTransactionState = {
  success: false,
  transaction: [] as any[],
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: initialTransactionState,
  reducers: {
    updateTransaction: (state, { payload }) => { 
         if (Array.isArray(payload)) {  
              state.transaction = [...payload]; 
             } else { 
                   console.error("Payload must be an array"); 
                 }},
    updateTransactionState: (state, { payload }: PayloadAction<boolean>) => {
      state.success = payload;
    },

    resetTransaction: () => initialTransactionState,
  },
});

export const TransactionAction = transactionSlice.actions;

export const { updateTransaction, updateTransactionState, resetTransaction } =
  TransactionAction;
