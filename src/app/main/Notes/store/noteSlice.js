/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from 'app/services/api/';

export const getOne = createAsyncThunk(
    'note/getOne',
    async (id, { dispatch }) => {
        const response = await ApiService.doGet(`/notes/${id}`);
        if (!response.success) {
            return response.data;
        }
        const { note } = await response.data;

        return { ...note };
    }
);

export const saveOne = createAsyncThunk(
    'note/saveOne',
    async (data, { dispatch }) => {
        const request = { ...data };

        const response = await ApiService.doPost('/notes', request);
        if (!response.success) {
            dispatch(updateResponse(response.data));
            return data;
        }
        const { note } = await response.data;

        dispatch(getOne(note.id));

        return {
            ...data,
            message: response.message,
            success: response.success,
        };
    }
);

export const updateOne = createAsyncThunk(
    'note/updateOne',
    async ({ data, id, userId }, { dispatch, getState }) => {
        const request = { ...data };

        const response = await ApiService.doPut(`/notes/${id}`, request);
        const oldState = getState().note;

        if (!response.success) {
            dispatch(updateResponse(response.data));
            return { ...data, id, userId, loading: false };
        }

        dispatch(getOne(id));

        return {
            ...oldState,
            message: response.message,
            success: response.success,
        };
    }
);

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
                    id: 'new',
                    title: '',
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
