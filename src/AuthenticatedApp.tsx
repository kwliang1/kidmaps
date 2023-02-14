import React, {PropsWithChildren} from "react";
import {ViewProvider} from "./providers/Navigation/views";
import MapsProvider from "./providers/Maps";
import {PlacesProvider} from "./providers/Places";
import Nav from "./components/Nav";
import PlacesView from "./views/Places";
import {NavContextProvider} from "./providers/Navigation";

const AuthenticatedApp = (props:PropsWithChildren) => {
    return(
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
}

export default AuthenticatedApp;