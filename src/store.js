import { createBrowserHistory, createMemoryHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import {createStore,compose,applyMiddleware} from 'redux'
import RootReducer from './reducer/index'
import createSagaMiddleware, { END } from "redux-saga";

const windowDefined = typeof window !== "undefined";
const sagaMiddleware = createSagaMiddleware();

export const configureStore = (url = '/') => {
    const history =  windowDefined ?  createBrowserHistory() : createMemoryHistory( { initialEntries: [ url ] } )
    const initialState = windowDefined ? ( window.REDUX_DATA || {} ) : {};
    const store = createStore(
        RootReducer(history),
        initialState,
        compose(
            applyMiddleware(
                routerMiddleware(history),sagaMiddleware
            )
        )
    )
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch( END );

    return {
        store,
        history
    }
}