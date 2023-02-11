import React from "react";
import Home from "./views/Home";
import Nav from "./components/Nav";
import PlacesView from "./views/Places";
import MapsProvider from "./providers/Maps";

import {ViewProvider} from "./providers/Navigation/views";
import {PlacesProvider} from "./providers/Places";
import {NavContextProvider} from "./providers/Navigation";
import {useLocationPermission} from "./providers/Location/LocationContext";

const App = () => {
    const permission = useLocationPermission();
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