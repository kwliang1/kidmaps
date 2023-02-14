import {useLocalStorage} from "./useStorage";
import {Coords} from "google-map-react";
import {useEffect, useState} from "react";


const defaultUserLocationCoords:Coords = {
    lat: 0,
    lng: 0
}

const defaultGeoLocationOptions:PositionOptions = {
    enableHighAccuracy: true,
}
export default function useLocation(){
    const loggingTag = `[useLocation]`;
    const [cachedCoords, setCachedCoords] = useLocalStorage('last_known_user_location', JSON.stringify(defaultUserLocationCoords));
    const [coords, setCoords] = useState<Coords>(cachedCoords);

    const updateCoords = (result:GeolocationPosition) => {//common function used to parse GeolocationPosition object => Coords and update state
        console.info(`${loggingTag} success! result:`, result);
        const {coords:coordsFromBrowser} = result;
        const newCoords = {
            lat: coordsFromBrowser.latitude,
            lng: coordsFromBrowser.longitude
        };
        setCoords(newCoords);
        return newCoords;
    }

    useEffect(() => {
        console.info(`${loggingTag} coords updated.   Updating cache`);
        setCachedCoords(coords);
    }, [coords]);

    useEffect(()=>{
        let watcher = navigator.geolocation.watchPosition(
            (result) => {
                updateCoords(result);
            },
            (error)=>{
                console.error(`${loggingTag} Unable to watchPosition. Error:`, error);
            },
            defaultGeoLocationOptions
        )
        console.info(`${loggingTag} established listener w/ id: ${watcher}`);
        return ()=>{
            console.info(`${loggingTag} unmount! clearing watchPosition listener w/ id: ${watcher}`);
            navigator.geolocation.clearWatch(watcher);
        }
    }, []);

    const requestLocation = async () : Promise<Coords> => {
        return new Promise((resolve, reject) => {
            try{
                navigator.geolocation.getCurrentPosition(
                    (result:GeolocationPosition) => {
                        console.info(`${loggingTag} success! result:`, result);
                        const newCoords = updateCoords(result);
                        resolve(newCoords);
                    },
                    (error: GeolocationPositionError) => {
                        reject(error);
                    },
                    {
                        ...defaultGeoLocationOptions,
                        timeout: 30000
                    }
                )
            } catch(e){
                reject(e);
            }
        })

    }

    return {coords, requestLocation}
}