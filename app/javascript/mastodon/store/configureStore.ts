import { configureStore } from '@reduxjs/toolkit';
// import appReducer from '../reducers';
import loadingBarMiddleware from '../middleware/loading_bar';
import errorsMiddleware from '../middleware/errors';
import soundsMiddleware from '../middleware/sounds';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { reducers } from '../reducers';

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    loadingBarMiddleware({ promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAIL'] }),
    errorsMiddleware(),
    soundsMiddleware(),
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//
// export type MastodonStore = ReturnType<typeof configureStore>;
// export type MastodonStoreState = MastodonStore extends Store<infer S, Action> ? S : never
// export type MastodonStoreAction = MastodonStore extends Store<unknown, infer A> ? A : never;
//
// export default function configureStore() {
//   return createStore(appReducer, compose(applyMiddleware(
//     thunk,
//     loadingBarMiddleware({ promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAIL'] }),
//     errorsMiddleware(),
//     soundsMiddleware(),
//   ), hasReduxDevToolsExtension(window) ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f));
// }
//
// interface WindowWithDevTools extends Window {
//   readonly __REDUX_DEVTOOLS_EXTENSION__: <T>() => ((t: T) => T);
// }
//
// function hasReduxDevToolsExtension(window: Window): window is WindowWithDevTools {
//   return '__REDUX_DEVTOOLS_EXTENSION__' in window;
// }
