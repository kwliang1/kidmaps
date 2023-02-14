import React from "react";

import {useLocationPermission} from "./providers/Location/LocationContext";

import Home from "./views/Home";
import dynamic from "next/dynamic";
import {Box, Typography} from "@mui/material";
import Pending from "./components/Places/Status/Pending";

const AppLoading = () => {
    return(
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}
        >
            <Pending text={'Loading...'}/>
        </Box>
    )
}
const DynamicApp = dynamic(()=>{
    return import('./AuthenticatedApp');
},{
    loading: () => <AppLoading/>
})

const DynamicHome = dynamic(() => {
    return import('./views/Home');
},{
    loading: () => <AppLoading/>
})


const App = () => {
    const permission = useLocationPermission();
    if(permission === "granted"){
        return (
            <DynamicApp/>
        )
    } else {
        return (
            <DynamicHome/>
        )
    }
}

export default App;