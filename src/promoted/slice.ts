import {Product} from '@domain/product.domain';
import {PayloadAction} from '@reduxjs/toolkit';
import {createGenericSlice, GenericState} from '@store/genericDataSlice';

const initialState: GenericState<Product[]> = {
  status: 'idle',
};

const wrappedSlice = createGenericSlice({
  name: 'promoProducts',
  initialState: initialState,
  reducers: {
    request: (state, payload: PayloadAction<string>) => ({
      ...state,
      status: 'loading'
    }),
  }
});

export const {
  request,
  success,
  failure,
} = wrappedSlice.actions;
export default wrappedSlice.reducer;