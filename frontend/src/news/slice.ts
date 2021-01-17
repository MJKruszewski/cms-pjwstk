import {News} from '@frontendDto/news.dto';
import {createGenericSlice, GenericState} from '@frontendStore/genericDataSlice';

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