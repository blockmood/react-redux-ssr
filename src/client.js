import React from "react";
import ReactDOM from "react-dom";
import App from './App'
import { Provider } from 'react-redux'
import {configureStore} from './store'
import { ConnectedRouter } from 'connected-react-router'
import rootSaga from './saga/index'
import { renderRoutes } from 'react-router-config'
import routes from './routes'
const {store,history} = configureStore({})

store.runSaga(rootSaga)
ReactDOM.hydrate(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {renderRoutes(routes)}
        </ConnectedRouter>
    </Provider>
    ,document.getElementById('root'))