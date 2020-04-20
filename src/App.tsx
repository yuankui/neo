import React from 'react';
import './App.scss';
import {Route, Switch, Redirect, useParams} from "react-router-dom";
import MathApp from "./app/math1/MathApp";


function App() {
    console.log(useParams());
    return <Switch>
        <Route strict={true} path='/math1/:config?'>
            <MathApp/>
        </Route>
        <Route>
            <Redirect to="/math1/" />
        </Route>
    </Switch>
}

export default App;
