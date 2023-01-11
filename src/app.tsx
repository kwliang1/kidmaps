import React, {useContext} from "react";
import {UserCtx} from "./providers/User";
import Home from "./views/Home";
import Nav from "./components/Nav";
import PlacesView from "./views/Places";

const App = () => {

    const {permission} = useContext(UserCtx);

    console.info(`permission:`, permission);

    if(permission === "granted"){
        return (
            <>
                <Nav/>
                <PlacesView/>
            </>
        )
    } else {
        return (
            <Home/>
        )
    }
}

export default App;