import React, {useCallback, useEffect, useState} from "react";
import {Coords} from "google-map-react";
import {createContext, useContext} from "react";
import {UserLocation} from "./LocationClass";

type UserCoordsType = Coords;
type UpdateCoordsType = (coords:Coords) => void;
type LocationPermissionStateType = PermissionState;
type UpdateLocationPermissionType = (coords:LocationPermissionStateType) => void;

const location = new UserLocation();

const CoordsContext = createContext<UserCoordsType>(location.coordinates);
const CoordsUpdateContext= createContext<UpdateCoordsType>(()=>{})
const LocationPermissionContext = createContext<LocationPermissionStateType>(location.permission.state);
const LocationPermissionUpdateContext = createContext<UpdateLocationPermissionType>(()=>{})
const LocationPermissionRequestContext = createContext(() => {});

export function useCoords () : (UserCoordsType) {
    return useContext(CoordsContext);
}
export function useCoordsUpdate(){
    return useContext(CoordsUpdateContext);
}

export function useLocationPermission () : (LocationPermissionStateType) {
    return useContext(LocationPermissionContext);
}
export function useLocationPermissionUpdate(){
    return useContext(LocationPermissionUpdateContext);
}

export function useLocationPermissionRequest () {
    return useContext(LocationPermissionRequestContext);
}

export function LocationProvider(props: React.PropsWithChildren){
    const loggingTag = `[LocationProvider]`;
    const {children} = props;
    const [coordinates, setCoordinates] = useState<UserCoordsType>(location.coordinates);
    const [permissionState, setPermissionState] = useState<LocationPermissionStateType>(location.permission.state);
    const updatePermissionState = (state:LocationPermissionStateType) => {
        setPermissionState(state);
    }
    const updateCoordinates = (coords:Coords) => {
        setCoordinates(coords);
    }

    useEffect(() => {//only initial mount
        console.info(`${loggingTag} Getting latest permission from browser...`);
        //getting status from browser
        location.permission.status
            .then(state => {
                console.info(`${loggingTag} Setting permission to: ${state}`);
                setPermissionState(state);
            })
            .catch(e => {
                console.error(`${loggingTag} An error occurred`, e);
            });
        requestPermission();
    }, []);

    useEffect(() => {
        setPermissionState(location.permission.state);
    }, [coordinates]);

    const requestPermission = useCallback( () => {
        location.update()
            .then((coords:Coords) => {
                setCoordinates(coords);
            })
            .catch((e) => {
                console.error(`${loggingTag} an error occurred`, e);
                const {message} = e;
                if(message.includes("denied")){
                    setPermissionState("denied");
                }
            })
    }, []);

    return(
        <CoordsContext.Provider value={coordinates}>
            <CoordsUpdateContext.Provider value={updateCoordinates}>
                <LocationPermissionContext.Provider value={permissionState}>
                    <LocationPermissionRequestContext.Provider value={requestPermission}>
                        <LocationPermissionUpdateContext.Provider value={updatePermissionState}>
                            {children}
                        </LocationPermissionUpdateContext.Provider>
                    </LocationPermissionRequestContext.Provider>
                </LocationPermissionContext.Provider>
            </CoordsUpdateContext.Provider>
        </CoordsContext.Provider>
    )
}