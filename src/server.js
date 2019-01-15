import express from "express";
import path from "path";
import React from "react";
import App from './App'
import fs from 'fs'
import ReactDom from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { configureStore } from './store'
import sagas from "./saga/index";
const app = express();

app.use( express.static( path.resolve( __dirname, "../" ) ) );


app.get( "/*",(req,res)=>{
    const context = {}
    const {store} = configureStore(req.url)
    store.dispatch({type:'INITIALISE_APP'});
    const jsx = (
        <Provider store={store}>
            <StaticRouter context={ context } location={ req.url }>
                <App />
            </StaticRouter>
        </Provider>
    )
    store.runSaga(sagas).done.then(()=>{
        const reduxState = store.getState();
        const reactDom = ReactDom.renderToString(jsx)
        let template = fs.readFileSync(path.resolve( __dirname, "../dist/template.html" ),"utf-8").replace('<div id="root"></div>', `<div id="root">${reactDom}<script>window.REDUX_DATA = ${ JSON.stringify( reduxState ) }</script></div>`);
        res.writeHead( 200, { "Content-Type": "text/html" } );
        res.end(template)
    })

    if(req.url === '/about'){
        store.dispatch( {type:'REQUEST'} );
    }

    store.close();
})

app.listen( 8888,()=>{
    console.log('8888 ~~~')
} );

