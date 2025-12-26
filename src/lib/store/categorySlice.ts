import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'category',
    initialState: { selectedId: null as number | null },
    reducers: {
        setCategory: (state, action: PayloadAction<number | null>) => {
            state.selectedId = action.payload;
        },
    },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;