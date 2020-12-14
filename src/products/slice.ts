import { Product } from '@domain/product.domain';
import { createGenericSlice, GenericState } from '@store/genericDataSlice';

const initialState: GenericState<Product[]> = {
  status: 'idle',
};

const wrappedSlice = createGenericSlice({
  name: 'products',
  initialState: initialState,
});

export const { request, success, failure } = wrappedSlice.actions;
export default wrappedSlice.reducer;