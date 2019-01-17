import React from 'react';
import Layout from './components/Layout'
import Home from './components/Home'
import About from './components/About'
import List from './components/List'

export default [
    {
        path:'/',
        component:Layout,
        routes:[
            {
                path:'/',
                component:Home,
                exact: true,
            },
            {
                path:'/about',
                component:About,
                loadData: About.loadData
            },
            {
                path:'/list',
                component:List,
                loadData: List.loadData
            }
        ]
    }
]