import { createSlice, PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit';

export interface GenericState<T> {
  data?: T;
  status: 'loading' | 'success' | 'failure' | 'idle';
  error?: string | any;
}

export const createGenericSlice = <T, Reducers extends SliceCaseReducers<GenericState<T>>>({
  name = '',
  initialState,
  reducers
}: {
  name: string
  initialState: GenericState<T>
  reducers?: ValidateSliceCaseReducers<GenericState<T>, Reducers>
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      request: (state) => ({
        ...state,
        status: 'loading'
      }),
      success: (state: GenericState<T>, action: PayloadAction<T>) => ({
        ...state,
        data: action.payload,
        status: 'success'
      }),
      failure: (state: GenericState<T>, action: PayloadAction<string | any>) => ({
        ...state,
        status: 'failure'
      }),
      ...reducers
    }
  });
};
