import { PcConfigurationDto } from '@frontendDto/configuration.dto';
import { Product } from '@frontendDto/product.dto';
import { PayloadAction } from '@reduxjs/toolkit';
import { createGenericSlice, GenericState } from '@frontendStore/genericDataSlice';

const initialState: GenericState<Product[]> = {
  status: 'idle'
};

const wrappedSlice = createGenericSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    postConfiguration: (state, { payload }: PayloadAction<PcConfigurationDto>) => ({
      ...state,
      status: 'loading'
    }),
    postConfigurationFinished: (state, { payload }: PayloadAction<boolean>) => ({
      ...state,
      status: payload ? 'success' : 'failure'
    })
  }
});

export const {
  request,
  success,
  failure,
  postConfiguration,
  postConfigurationFinished
} = wrappedSlice.actions;
export default wrappedSlice.reducer;
