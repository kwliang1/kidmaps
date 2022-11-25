import React, {createContext, useEffect, useMemo, useState} from "react";
import {Coords} from "google-map-react";

class UserLocation {
    private readonly tag: string;
    private readonly _localstorage_key: string;
    private _coordinates: Coords;
    _permission: UserLocationPermission;
    constructor() {
        this._localstorage_key = `last_known_user_location`;
        this._coordinates = this.getLastKnownLocation();
        this._permission = new UserLocationPermission();
        this.tag = `[UserLocation]`;
    }

    get coordinates():Coords{
        return this._coordinates;
    }

    set current(location:Coords){
        this._coordinates = location;
        this.cacheUserLastKnownLocation(location);
    }

    getLastKnownLocation(){
        //default coordinates value
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

    getFromBrowser(): Promise<Coords|GeolocationPositionError|Error> {
        return new Promise((resolve, reject)=> {
            if(navigator.geolocation){//just checks if it's been supported
                const permissionStatus = this._permission.status;
                if(permissionStatus === "unknown"){
                    this._permission.getCurrentStatusFromBrowser()
                        .then(() => {
                          this.getFromBrowser();//recursively call itself
                        })
                } else if (permissionStatus.state === "denied"){
                    console.error(`${this.tag} Permission denied :(`);
                } else {//granted or prompt
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
                            resolve(this.current);
                        },
                        (positionError: GeolocationPositionError) => {
                            console.error(`Error occurred getting user location`, positionError);
                            reject(positionError);
                        }
                    )
                }
            } else {
                const errMessage = 'navigator.geolocation not available';
                console.error(errMessage);
                reject(new Error(errMessage));
            }
        });
    }

}

class UserLocationPermission {
    status: PermissionStatus | "unknown";
    _name: PermissionName;
    constructor() {
        this._name = "geolocation";
        this.status = 'unknown';
    }
    getCurrentStatusFromBrowser():Promise<PermissionStatus|Error>{
        return new Promise((resolve, reject) => {
            if(navigator.permissions){
                navigator.permissions.query({name: this._name})
                    .then((status) => {
                        this.status = status;
                        resolve(status);
                    })
                    .catch(err => {
                        reject(err);
                    })
            } else {
                reject(new Error('Navigator Permission not supported'))
            }
        })
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