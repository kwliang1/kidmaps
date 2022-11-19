import React, {createContext, useEffect, useMemo, useState} from "react";
import {Coords} from "google-map-react";

class UserLocation {
    private readonly _localstorage_key: string;
    private _coordinates: Coords;
    constructor() {
        this._localstorage_key = `last_known_user_location`;
        this._coordinates = this.getLastKnownLocation();
    }

    get coordinates():Coords{
        return this._coordinates;
    }

    set current(location:Coords){
        this._coordinates = location;
        this.cacheUserLastKnownLocation(location);
    }

    getLastKnownLocation(){
        let coordinates = {
            lat: 0,
            lng: 0
        }
        try{
            if(typeof localStorage !== "undefined"){
                const locationStr = localStorage.getItem(this._localstorage_key);
                if(locationStr !== null){
                    coordinates = JSON.parse(locationStr);
                }
            }
        } catch(e){
            console.error(`Unable to get the user's last location: `, e);
        }
        return coordinates;
    }

    cacheUserLastKnownLocation(location : Coords){
        //need to store a string in LS 10.31.22 KL
        localStorage.setItem(this._localstorage_key, JSON.stringify(location));
    }

    getFromBrowser() : void {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (result: GeolocationPosition) => {
                    console.info(`user location result`, result);
                    const {coords} = result,
                        {latitude:lat, longitude:lng} = coords;
                    console.info(`setting coordinates to lat:${lat} long:${lng}`);
                    this.current = {
                        lat,
                        lng
                    };//this will update the class, as well as the local storage key to be retrieved at a later time 11.2.22 KL
                },
                (positionError: GeolocationPositionError) => {
                    console.error(`Error occurred getting user location`, positionError);
                }
            )
        } else {
            console.error(`navigator.geolocation not available`);
        }
    }
}

interface UserContextInterface {
    id: string | number;
    name: string;
    location: UserLocation
}

const defaultUserContext : UserContextInterface = {
    id: 0,
    name: "",
    location: new UserLocation()
}

const UserCtx = createContext<UserContextInterface>(defaultUserContext as UserContextInterface);

const UserContextProvider = (props: React.PropsWithChildren) => {
    console.info(`[UserContextProvider] props`, props);
    const {children} = props;
    const [location, setLocation] = useState<UserLocation | undefined>();
    const [user, setUser] = useState<UserContextInterface>(defaultUserContext);

    useEffect(()=>{
        const currentLocation = new UserLocation();
        setLocation(currentLocation);
    }, []);

    useEffect(() => {
        if(location){
            setUser({...user, location});
        }
    }, [location]);

    return (
        <UserCtx.Provider value={user}>
            {children}
        </UserCtx.Provider>
    )
}

export {UserCtx, UserContextProvider, UserLocation}