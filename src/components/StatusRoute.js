import React from 'react'
import { Route } from "react-router-dom";

export default (props) => (
    <Route render={({staticContext})=>{
        if(staticContext){
            staticContext.statusCode = props.code
        }
        return props.children;
    }} />
)