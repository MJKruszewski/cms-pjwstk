import {PcConfigurationDto} from '../../../api/domain/configuration.domain';
import {OrderDto} from '../../../api/domain/order.domain';
import {PayloadAction} from '@reduxjs/toolkit';
import {createGenericSlice, GenericState} from '@frontendStore/genericDataSlice';

const initialState: GenericState<PcConfigurationDto> = {
  status: 'idle',
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
  postPaymentFinished,
} = wrappedSlice.actions;
export default wrappedSlice.reducer;