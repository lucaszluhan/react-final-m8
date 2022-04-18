import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import ApiService from 'app/services/api';
// import { useSelector } from 'react-redux';

export const getAll = createAsyncThunk('notes/getNotes', async (_, { getState, dispatch }) => {
    const user = getState().auth;
    const response = await ApiService.doGet(`/notes/${user.user.uid}`);
    const { data } = response;

    return data;
});

const adapter = createEntityAdapter({
    selectId: (note) => note.uid,
});

export const { selectAll, selectById } = adapter.getSelectors((state) => state.notes);

const notesSlice = createSlice({
    name: 'notes',
    initialState: adapter.getInitialState(),
    reducers: {},
    extraReducers: {
        [getAll.fulfilled]: adapter.setAll,
    },
});

export default notesSlice.reducer;
