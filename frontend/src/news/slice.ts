import { PcConfigurationDto } from '@frontendDto/configuration.dto';
import { News } from '@frontendDto/news.dto';
import { PayloadAction } from '@reduxjs/toolkit';
import { createGenericSlice, GenericState } from '@frontendStore/genericDataSlice';

const initialState: GenericState<News[]> = {
  status: 'idle',
};

const wrappedSlice = createGenericSlice({
  name: 'news',
  initialState: initialState,
  reducers: {}
});

export const {
  request,
  success,
  failure,
} = wrappedSlice.actions;
export default wrappedSlice.reducer;