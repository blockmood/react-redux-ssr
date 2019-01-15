import React from 'react'
import { connectRouter } from 'connected-react-router'
import {combineReducers} from 'redux' 
import RootReducer from './rootReducer'

export default (history) => combineReducers({
    store:RootReducer,
    router:connectRouter(history)
})