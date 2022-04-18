/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from 'app/services/api/';

export const getOne = createAsyncThunk('note/getOne', async (id, { getState, dispatch }) => {
    const state = getState().notes;
    const note = state.entities[id];

    return note;
});

export const saveOne = createAsyncThunk('note/saveOne', async (data, { getState, dispatch }) => {
    const user = getState().auth;
    const request = { ...data };

    const response = await ApiService.doPost(`/notes/${user.user.uid}`, request);

    return {
        ...data,
    };
});

export const updateOne = createAsyncThunk(
    'note/updateOne',
    async ({ data, id }, { dispatch, getState }) => {
        const user = getState().auth;
        const request = { ...data };

        await ApiService.doPut(`/notes/${id}/${user.user.uid}`, request);

        return {
            ...data,
        };
    }
);

export const deleteOne = createAsyncThunk('note/deleteOne', async (id, { getState }) => {
    const user = getState().auth;
    await ApiService.doDelete(`/notes/${id}/${user.user.uid}`);
});

const initialState = {
    success: false,
    message: '',
    errorCode: '',
    loading: false,
    title: '',
    description: '',
};

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        newData: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({
                payload: {
                    uid: 'new',
                    detail: '',
                    description: '',
                    success: false,
                    loading: false,
                    message: '',
                    errorCode: '',
                },
            }),
        },
        clearState: (state, action) => initialState,
        updateState: (state, action) => {
            return { ...state, ...action.payload };
        },
        updateResponse: (state, action) => {
            state.success = action.payload.success;
            state.message = action.payload.message;
        },
        updateLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers: {
        [getOne.fulfilled]: (state, action) => action.payload,
        [saveOne.fulfilled]: (state, action) => action.payload,
        [updateOne.fulfilled]: (state, action) => action.payload,
    },
});

export const { newData, updateResponse, updateLoading } = noteSlice.actions;

export default noteSlice.reducer;
