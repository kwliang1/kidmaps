import React, {useCallback, useContext, useEffect, useState} from "react";
import {ChangeEventValue, Coords} from "google-map-react";

import {Box} from "@mui/material";
import {UserCtx} from "../../providers/User/User";
import {NavCtx} from "../../providers/Navigation/Navigation";

import Map from "../../components/Map";
import Marker from "../../components/Map/Marker";
import MapStatus from "../../components/Map/Status";

import {searchByKeyword} from "../../../utils/Locations";

interface Destination {
    text: string | undefined;
    type: string | undefined;
    lat: number;
    lng: number;
}

interface MapViewProps extends React.ComponentProps<any>{

}

const MapView = (props: MapViewProps) => {
    const userContext = useContext(UserCtx);
    const {mode} = useContext(NavCtx);
    console.info(`current user mode`, mode);

    const [destinations, setDestinations] = useState<Destination[] | undefined>();
    const [coordinates, setCoordinates] = useState<Coords>(userContext.location.coordinates);
    const [userMap, setMap] = useState<google.maps.Map | undefined>();
    const [searchStatus, setSearchStatus] = useState<boolean | string>(false);

    useEffect(() => {
        if(navigator.geolocation){
            console.info(`already have the user's location permission!`);
            userContext.location.getFromBrowser();
            //setting the user's coordinates
        } else {
            console.error(`don't have the user's permission. ruh roh`);
        }
    }, []);

    const getDestinations = useCallback(async () => {
        console.info(`mode in getBathrooms: ${mode}`);

        if(userMap){//only call this function is usermap is available
            try{

                let mapViewSearchRequirements = {
                    map:userMap,
                    requestOptions:{
                        keyword: mode.keyword,
                        type: mode.type,
                        bounds: userMap.getBounds()
                    }
                };

                const results = await searchByKeyword(mapViewSearchRequirements);
                console.info(`results`, results);
                const newDestinations = Array.isArray(results) ? results.map((result: google.maps.places.PlaceResult) => {
                    console.info(`mode: ${mode}`);
                    return {
                        text: typeof result.name === "string" ? result.name : '',
                        type: mode.id,
                        lat: result?.geometry?.location ? result.geometry.location.lat() : 0,
                        lng: result?.geometry?.location ? result.geometry.location.lng() : 0
                    }
                }) : [];
                console.info(`new destinations`, newDestinations);
                setDestinations(newDestinations);
            } catch(e){
                console.error(`Error getting destinations`, e);
                setDestinations([]);
                if(e === google.maps.places.PlacesServiceStatus.ZERO_RESULTS){
                    setSearchStatus(`No destinations found`);
                }
            }
        }


    }, [mode, userMap, coordinates]);

    useEffect( () => {
        if(userMap !== null){//the google js lib has been initialized
            getDestinations();
        }
    }, [userMap, coordinates, getDestinations]);

    // @ts-ignore
    const handleGoogleApiResponse = ({map} = {}) => {
        //this is the "on load" event of the Google API js lib.
        //"maps" is a reference to the maps API object
        const loggingTag = `[GoogleAPILoaded]`;
        console.info(`${loggingTag} loaded`);
        if(map){
            console.info(`${loggingTag} map`, map);
            setMap(map);
            // console.info(`${loggingTag} maps`, maps);
        }
        // console.info(`${loggingTag} service?`, service);
    }

    const handleOnChange = (map: ChangeEventValue) => {
        console.info(`on change,`, map);
        const {center} = map;
        setCoordinates(center);
    };

    const handleOnDrag = useCallback((map: ChangeEventValue) => {
        console.info(`on drag`, map);
        //noe to KL, if destinations are not undefined, it will pass the first check below
        if(destinations && destinations.length > 0){
            setDestinations(undefined);
        }
    }, [destinations]);

    return (
        <Box
            component={"main"}
            sx={{
                flexGrow: 1,
                height: '100vh',
            }}
        >
            <Map
                center={coordinates}
                onGoogleApiLoaded={handleGoogleApiResponse}
                onChange={handleOnChange}
                onDrag={handleOnDrag}
            >
                {
                    Array.isArray(destinations) &&
                    destinations.map((destination,index) => (
                        <Marker
                            text={destination.text}
                            type={destination.type}
                            key={index}
                            lng={destination.lng}
                            lat={destination.lat}
                        />
                    ))
                }
            </Map>
            {searchStatus && <MapStatus message={searchStatus}/>}
        </Box>
    )
}

export default MapView;