import {PcConfigurationDto} from '../../../api/domain/configuration.domain';
import {Product} from '../../../api/domain/product.domain';
import {PayloadAction} from '@reduxjs/toolkit';
import {createGenericSlice, GenericState} from '@frontendStore/genericDataSlice';

const initialState: GenericState<Product[]> = {
  status: 'idle',
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