import express from "express";
import path from "path";
import React from "react";
import App from './App'
import fs from 'fs'
import ReactDom from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { configureStore } from './store'
import routes from './routes'
import { matchRoutes,renderRoutes } from "react-router-config";
import sagas from "./saga/index";
const app = express();

app.use( express.static( path.resolve( __dirname, "../" ) ) );


app.get( "/*",(req,res)=>{
    const context = {}
    const {store} = configureStore(req.url)
    const matchedRoutes = matchRoutes(routes, req.path)
    let arr = []
    matchedRoutes.forEach(v => {
        if(v.route.loadData){
            let promise = new Promise((resolve,reject)=>{
                let data = v.route.loadData(store) 
                'type' in data ? resolve(data) : reject('error')
            })
            arr.push(promise)
        }
    })

    Promise.all(arr).then(response => {
        store.runSaga(sagas).done.then(()=>{
            const reduxState = store.getState();
            const reactDom = ReactDom.renderToString(jsx)
            let template = fs.readFileSync(path.resolve( __dirname, "../dist/template.html" ),"utf-8").replace('<div id="root"></div>', `<div id="root">${reactDom}<script>window.REDUX_DATA = ${ JSON.stringify( reduxState ) }</script></div>`);
            res.writeHead( 200, { "Content-Type": "text/html" } );
            res.end(template)
        })
        response.length > 0 ? store.dispatch(response[0]) : store.dispatch({type:'INITIALISE_APP'});
        store.close();
    }).catch(error => {
        //rediection 404 ...
        console.log('error')
    })
    
    const jsx = (
        <Provider store={store}>
            <StaticRouter context={ context } location={ req.url }>
                {renderRoutes(routes)}
            </StaticRouter>
        </Provider>
    )

})

app.listen( 8888,()=>{
    console.log('8888 ~~~')
} );

