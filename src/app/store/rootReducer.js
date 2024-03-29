import note from 'app/main/Notes/store/noteSlice';
import notes from 'app/main/Notes/store/notesSlice';

import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import fuse from './fuse';
import i18n from './i18nSlice';

const createReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        auth,
        fuse,
        i18n,
        note,
        notes,
        ...asyncReducers,
    });

    /*
	Reset the redux store when user logged out
	 */
    if (action.type === 'auth/user/userLoggedOut') {
        // state = undefined;
    }

    return combinedReducer(state, action);
};

export default createReducer;
