import { PcConfigurationDto } from '@frontendDto/configuration.dto';
import { OrderDto } from '@frontendDto/order.dto';
import { PayloadAction } from '@reduxjs/toolkit';
import { createGenericSlice, GenericState } from '@frontendStore/genericDataSlice';
import { CartDto } from '@frontendDto/cart.dto';

const initialState: GenericState<PcConfigurationDto> = {
  status: 'idle'
};

const wrappedSlice = createGenericSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    request: (state, payload: PayloadAction<string>) => ({
      ...state,
      status: 'loading'
    }),
    postPayment: (state, payload: PayloadAction<OrderDto>) => ({
      ...state,
      status: 'loading'
    }),
    putCart: (state, payload: PayloadAction<CartDto>) => ({
      ...state,
      status: 'loading'
    }),
    getCart: (state, payload: PayloadAction<string>) => ({
      ...state,
      status: 'loading'
    }),
    postPaymentFinished: (state, { payload }: PayloadAction<boolean>) => ({
      ...state,
      status: payload ? 'success' : 'failure'
    })
  }
});

export const {
  request,
  success,
  failure,
  postPayment,
  putCart,
  getCart,
  postPaymentFinished
} = wrappedSlice.actions;
export default wrappedSlice.reducer;
