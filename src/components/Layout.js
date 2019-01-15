import React from 'react'
import { Link, Switch, Route } from "react-router-dom";

import Home from './Home'
import About from './About'
import StatusRoute  from './StatusRoute'

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
                    </ol>
                    <Switch>
                        <Route path="/" exact component={ Home } />
                        <Route path="/about" exact component={ About } />
                        <StatusRoute code={404}>
                            <div>
                                Not Found
                            </div>
                        </StatusRoute>
                    </Switch>
            </div>
        );
    }
}

export default Layout