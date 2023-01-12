import React, {useContext} from "react";
import {UserCtx} from "./providers/User";
import Home from "./views/Home";
import Nav from "./components/Nav";
import PlacesView from "./views/Places";
import MapsProvider from "./providers/Maps";
import {ViewProvider} from "./providers/Navigation/views";
import {PlacesProvider} from "./providers/Places";
import {NavContextProvider} from "./providers/Navigation";

const App = () => {

    const {permission} = useContext(UserCtx);

    console.info(`permission:`, permission);

    if(permission === "granted"){
        return (
            <NavContextProvider>
                <ViewProvider>
                    <MapsProvider>
                        <PlacesProvider>
                            <Nav/>
                            <PlacesView/>
                        </PlacesProvider>
                    </MapsProvider>
                </ViewProvider>
            </NavContextProvider>

        )
    } else {
        return (
            <Home/>
        )
    }
}

export default App;