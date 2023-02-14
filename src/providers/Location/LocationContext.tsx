import React, {useCallback, useEffect, useState} from "react";
import {Coords} from "google-map-react";
import {createContext, useContext} from "react";
import {UserLocation} from "./LocationClass";
import {useLocalStorage} from "../../hooks/useStorage";
import useBrowserPermission from "../../hooks/useBrowserPermission";
import useLocation from "../../hooks/useLocation";

type UserCoordsType = Coords;
type UpdateCoordsType = (coords:Coords) => void;
type LocationPermissionStateType = PermissionState;
type UpdateLocationPermissionType = (coords:LocationPermissionStateType) => void;

const location = new UserLocation();

const CoordsContext = createContext<UserCoordsType>(location.coordinates);
const LocationPermissionContext = createContext<LocationPermissionStateType>(location.permission.state);
const LocationPermissionRequestContext = createContext(() => {});

export function useCoords () : (UserCoordsType) {
    return useContext(CoordsContext);
}
export function useLocationPermission () : (LocationPermissionStateType) {
    return useContext(LocationPermissionContext);
}

export function useLocationPermissionRequest () {
    return useContext(LocationPermissionRequestContext);
}

export function LocationProvider(props: React.PropsWithChildren){
    const loggingTag = `[LocationProvider]`;
    const {children} = props;
    const {state} = useBrowserPermission('geolocation');
    const [permissionState, setPermissionState] = useState<LocationPermissionStateType>(state);
    const {coords, requestLocation} = useLocation();
    // console.info(`${loggingTag} testing browser permission hook! Value rcvd:`, state);
    console.info(`${loggingTag} render`);
    useEffect(()=>{
        console.info(`${loggingTag} mount`);
    }, []);
    useEffect(()=>{
        setPermissionState(state);
    }, [state])
    return(
        <LocationPermissionContext.Provider value={permissionState}>
            <LocationPermissionRequestContext.Provider value={requestLocation}>
                {state === "granted" ? (
                    <CoordsContext.Provider value={coords}>
                        {children}
                    </CoordsContext.Provider>
                ) : (
                    <>
                        {children}
                    </>
                )}
            </LocationPermissionRequestContext.Provider>
        </LocationPermissionContext.Provider>
    )
}