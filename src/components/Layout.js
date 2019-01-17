import React from 'react'
import { Link, Switch, Route } from "react-router-dom";
import { renderRoutes } from 'react-router-config'

class Layout extends React.Component{
    constructor() {
        super();
        this.state = {
            title: "React SSR",
        };
    }
    render() {
        return (
            <div>
                    <h1>{ this.state.title }</h1>
                    <ol>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/list">List</Link></li>
                    </ol>
                    { renderRoutes(this.props.route.routes) }
            </div>
        );
    }
}

export default Layout