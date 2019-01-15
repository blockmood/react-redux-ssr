import { createBrowserHistory, createMemoryHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import {createStore,compose,applyMiddleware} from 'redux'
import RootReducer from './reducer/index'

const windowDefined = typeof window !== "undefined";

export const configureStore = (url = '/') => {
    const history =  windowDefined ?  createBrowserHistory() : createMemoryHistory( { initialEntries: [ url ] } )
    const initialState = windowDefined ? ( window.REDUX_DATA || {} ) : {};
    const store = createStore(
        RootReducer(history),
        initialState,
        compose(
            applyMiddleware(
                routerMiddleware(history)
            )
        )
    )

    return {
        store,
        history
    }
}