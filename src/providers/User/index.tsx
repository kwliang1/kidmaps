import React, {createContext, useEffect, useState, useCallback} from "react";
import {Coords} from "google-map-react";
import {UserLocationPermission} from "./Location/Permission";
import {UserLocation} from "./Location";

interface UserContextInterface {
    id: string | number;
    name: string;
    requestPermission?: ()=>void;
    permission?: UserLocationPermission["state"];
    location?: Coords;
}

const defaultUserContext : UserContextInterface = {
    id: 0,
    name: ""
}

const UserCtx = createContext<UserContextInterface>(defaultUserContext as UserContextInterface);

const userLocation = new UserLocation();//initializing now so that we can reference the cached location

const UserContextProvider = (props: React.PropsWithChildren) => {
    const loggingTag = `[UserContextProvider]`
    const {children} = props;
    console.info(`${loggingTag} props`, props);
    const [permission, setPermission] = useState<UserLocationPermission["state"]>(userLocation.permission.state);
    const [location, setLocation] = useState<UserContextInterface["location"]>(userLocation.coordinates);


    useEffect(() => {//only initial mount
        //getting status from browser
        userLocation.permission.status
            .then(state => {
                console.info(`${loggingTag} Setting permission to: ${state}`);
                setPermission(state);
            })
            .catch(e => {
                console.error(`${loggingTag} An error occurred`, e);
            });
        requestPermission();
    }, []);

    useEffect(() => {
        setPermission(userLocation.permission.state);
    }, [location]);

    const requestPermission = useCallback( () => {
        userLocation.update()
            .then((coords) => {
                setLocation(coords);
            })
            .catch((e) => {
                console.error(`${loggingTag} an error occurred`, e);
                const {message} = e;
                if(message.includes("denied")){
                    setPermission("denied");
                }
            })
    }, []);

    const context : UserContextInterface = {
        ...defaultUserContext,
        permission,
        requestPermission,
        location
    }

    return (
        <UserCtx.Provider value={context}>
            {children}
        </UserCtx.Provider>
    )
}

export {UserCtx, UserContextProvider, UserLocation}