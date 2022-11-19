/* global google*/

import {Box, Snackbar, Button, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleMapReact, {ChangeEventValue, Coords, Maps} from "google-map-react";
import MapMarker from "./MapMarker";
import MapStatus from "../MapStatus/MapStatus";
import React, {useContext, useEffect, useState, useCallback} from "react";
import {searchByKeyword} from "../../../utils/Locations";
import { UserCtx } from "../../providers/User/User";
import { NavCtx } from "../../providers/Navigation/Navigation";

interface Destination {
    text: string | undefined;
    type: string | undefined;
    lat: number;
    lng: number;
}

const MapView = (props: React.ComponentProps<any> = {left : 0}) => {

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
                    request_options:{
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

    const defaultProps = {
        zoom: 17
    };

    const mapLayers = ['TransitLayer'];

    // @ts-ignore
    const handleGoogleApiResponse = ({map} = {}) => {
        //this is the "on load" event of the Google API js lib.
        //"maps" is a reference to the maps API object
        const loggingTag = `[GoogleAPILoaded]`;
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
                width: 400
            }}
        >
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.NEXT_PUBLIC_GOOG_MAPS_API_KEY,
                    libraries: ['places']
                }}
                center={coordinates}
                defaultZoom={defaultProps.zoom}
                layerTypes={mapLayers}
                onGoogleApiLoaded={handleGoogleApiResponse}
                onChange={handleOnChange}
                onDrag={handleOnDrag}
            >
                {/*<MapMarker/>*/}
                {Array.isArray(destinations) ? destinations.map((destination,index) => (
                    <MapMarker
                        text={destination.text}
                        type={destination.type}
                        key={index}
                        lng={destination.lng}
                        lat={destination.lat}
                    />
                )):<></>}
            </GoogleMapReact>
            {searchStatus ? <MapStatus message={searchStatus}/> : <></>}
        </Box>
    )
}

export default MapView;