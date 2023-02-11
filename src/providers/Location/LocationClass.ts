import {Coords} from "google-map-react";
import {UserLocationPermission} from "./LocationPermissionClass";

export class UserLocation {
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
    get permission():UserLocationPermission{
        return this._permission;
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

    update():Promise<Coords>{

        return new Promise((resolve, reject) => {

            navigator.geolocation.getCurrentPosition(
                (result: GeolocationPosition) => {
                    // console.info(`user location result`, result);
                    const {coords} = result,
                        {latitude:lat, longitude:lng} = coords;
                    // console.info(`setting coordinates to lat:${lat} long:${lng}`);
                    this.permission.state = "granted";
                    const coordinates = {
                        lat,
                        lng
                    }
                    //testing
                    // const coordinates = {
                    //     lat:40.7237284,
                    //     lng:-74.0084371
                    // }
                    this.current = coordinates;//this will update the class, as well as the local storage key to be retrieved at a later time 11.2.22 KL
                    resolve(coordinates);
                },
                (positionError: GeolocationPositionError) => {
                    console.error(`Error occurred getting user location`, positionError);
                    this.permission.state = "denied";
                    reject(positionError)
                },
                {
                    enableHighAccuracy: true,
                    timeout: 30000//30 seconds
                }
            )
        })
    }
}