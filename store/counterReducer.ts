import { PayloadAction } from '@reduxjs/toolkit';
import { createGenericSlice, GenericState } from './genericDataSlice';

const initialCounterState: GenericState<number> = {
  status: 'idle',
  data: 12
};

const wrappedCounterSlice = createGenericSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment(state, { payload }: PayloadAction<number>) {
      state.data += payload;
    },
    decrement(state, { payload }: PayloadAction<number>) {
      state.data -= payload;
    }
  }
});

export const { increment, decrement } = wrappedCounterSlice.actions;
export default wrappedCounterSlice.reducer;