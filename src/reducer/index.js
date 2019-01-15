import React from 'react'
import { connectRouter } from 'connected-react-router'
import {combineReducers} from 'redux' 
import RootReducer from './rootReducer'
import AppReducer from './appReducer'

export default (history) => combineReducers({
    app:AppReducer,
    store:RootReducer,
    router:connectRouter(history)
})