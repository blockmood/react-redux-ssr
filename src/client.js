import React from "react";
import ReactDOM from "react-dom";
import App from './App'
import { Provider } from 'react-redux'
import {configureStore} from './store'
import { ConnectedRouter } from 'connected-react-router'
import rootSaga from './saga/index'
const {store,history} = configureStore({})
store.runSaga(rootSaga)
ReactDOM.hydrate(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
    ,document.getElementById('root'))