import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import postsReducer from '../features/posts/postsSlice';
import mySaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    posts: postsReducer,
})

export const setupStore = preloadedState => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([sagaMiddleware]),
        preloadedState
    });

    sagaMiddleware.run(mySaga);

    return store;
}

export const store = setupStore();

