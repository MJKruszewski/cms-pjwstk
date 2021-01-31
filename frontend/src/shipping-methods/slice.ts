import { createGenericSlice, GenericState } from '@frontendStore/genericDataSlice';
import { ShippingMethod } from '@frontendDto/shipping-method.dto';

const initialState: GenericState<ShippingMethod[]> = {
  status: 'idle'
};

const wrappedSlice = createGenericSlice({
  name: 'shippingMethods',
  initialState: initialState,
  reducers: {}
});

export const {
  request,
  success,
  failure
} = wrappedSlice.actions;
export default wrappedSlice.reducer;
