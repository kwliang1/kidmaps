/* global google*/

import {Box, Snackbar, Button, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleMapReact, {ChangeEventValue, Coords, Maps} from "google-map-react";
import MapMarker from "./MapMarker";
import React, {useContext, useEffect, useState, useCallback} from "react";
import {searchForBathrooms, searchForIceCream, searchForParks, UserLocation} from "../../../utils/Locations";
import {NavCtx, Mode} from "../../providers/Navigation/Navigation";

const SearchStatus = (props: React.ComponentProps<any>) => {
    const {message} = props;
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    }
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Snackbar
            open={open}
            autoHideDuration={2500}
            message={message}
            action={action}
        />
    )
}

interface Destination {
    text: string | undefined;
    type: string | undefined;
    lat: number;
    lng: number;
}

const MapView = (props = {left : 0}) => {

    const position = new UserLocation();
    console.info(`position:`, position.coordinates);
    const {mode} = useContext(NavCtx);
    console.info(`current user mode`, mode);

    const [destinations, setDestinations] = useState<Destination[] | undefined>();
    const [coordinates, setCoordinates] = useState(position.coordinates);
    const [userMap, setMap] = useState(null);
    const [searchStatus, setSearchStatus] = useState<boolean | string>(false);

    const gotUserLocation = (result: any) => {
        const loggingTag = `[gotUserLocation]`;
        try{
            console.info(`user location result`, result);
            const {coords} = result,
                {latitude:lat, longitude:lng} = coords;
            console.info(`setting coordinates to lat:${lat} long:${lng}`);

            const coordinates = {
                    lat,
                    lng
                };

            position.current = coordinates;//this will update the class, as well as the local storage key to be retrieved at a later time 11.2.22 KL
            setCoordinates(coordinates);
        } catch(e){
            console.error(`${loggingTag} Error:`, e);
        }
    }

    useEffect(() => {
        if(navigator.geolocation){
            console.info(`already have the user's location permission!`);
            navigator.geolocation.getCurrentPosition(gotUserLocation);
            //setting the user's coordinates
        } else {
            console.error(`don't have the user's permission. ruh roh`);
        }
    }, []);

    const getDestinations = useCallback(async () => {
        console.info(`mode in getBathrooms: ${mode}`);

        if(userMap){//only call this function is usermap is available
            try{
                const results = mode.id === "bathrooms" ? await searchForBathrooms({keyword:mode.keyword ,userMap, coordinates}) :
                    mode.id === "ice_cream" ? await searchForIceCream({keyword:mode.keyword, userMap, coordinates}) :
                        mode.id === "restaurants" ? await searchForIceCream({keyword:mode.keyword, userMap, coordinates}) :
                            await searchForParks({keyword: "parks", userMap, coordinates});

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
        center: coordinates,
        zoom: 17
    };

    const mapLayers = ['TransitLayer'];

    // @ts-ignore
    // KL added the ts-ignore because it's a bug associated with the type defined by google maps (any)
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
          setDestinations(destinations);
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
                    key: 'AIzaSyAi193RzMZbOL6axK3hTrBSzUtzcfXFiHM',
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
            {searchStatus ? <SearchStatus message={searchStatus}/> : <></>}
        </Box>
    )
}

export default MapView;