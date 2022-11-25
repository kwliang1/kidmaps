import React, {useCallback, useContext, useEffect, useState} from "react";
import {ChangeEventValue, Coords} from "google-map-react";

import {Box} from "@mui/material";
import {UserCtx} from "../../providers/User/User";
import {NavCtx} from "../../providers/Navigation/Navigation";

import Map from "../../components/Map";
import Marker from "../../components/Map/Marker";
import MapStatus from "../../components/Map/Status";

import {PlacesSearch} from "../../../utils/PlacesSearch";

interface MapViewProps extends React.ComponentProps<any>{

}

const MapView = (props: MapViewProps) => {
    const userContext = useContext(UserCtx);
    const {mode} = useContext(NavCtx);
    // console.info(`current user mode`, mode);

    const [search, setSearch] = useState<PlacesSearch | undefined>();
    const [destinations, setDestinations] = useState<google.maps.places.PlaceResult[] | undefined>();
    const [coordinates, setCoordinates] = useState<Coords>(userContext.location.coordinates);
    const [map, setMap] = useState<google.maps.Map | undefined>();
    const [searchStatus, setSearchStatus] = useState<boolean | string>(false);

    useEffect(() => {
        if(navigator.geolocation){
            console.info(`already have the user's location permission!`);
            userContext.location.getFromBrowser()
                .then((result) => {
                    console.info(result);
                    if(result){
                        setCoordinates(result);
                    }
                })
                .catch(e => {
                    console.error(`Error occurred retrieving user's location:`, e);
                });
            //setting the user's coordinates
        } else {
            console.error(`don't have the user's permission. ruh roh`);
        }
    }, []);

    const getDestinations = useCallback( () => {
        if(map){//only call this function is usermap is available
            let mapViewSearchRequirements = {
                requestOptions:{
                    keyword: mode.keyword,
                    type: mode.type,
                    bounds: map.getBounds()
                }
            };

            search?.byKeyword(mapViewSearchRequirements)
                .then(results => {
                    console.info(`results`, results);
                    if(Array.isArray(results)) {
                        setDestinations(results);
                    }
                })
                .catch(e => {
                    console.error(`Error getting destinations`, e);
                    setDestinations(undefined);
                    if(e === google.maps.places.PlacesServiceStatus.ZERO_RESULTS){
                        setSearchStatus(`No destinations found`);
                    }
                })
        }
    }, [mode, map, search]);

    useEffect( () => {
        if(map !== null){//the google js lib has been initialized
            setSearch(new PlacesSearch(map));
        }
    }, [map]);

    useEffect(() => {
        if(search){
            getDestinations();
        }
    }, [search, getDestinations, coordinates]);

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
        // console.info(`on change,`, map);
        const {center} = map;
        setCoordinates(center);
    };

    const handleOnDrag = useCallback((map: ChangeEventValue) => {
        // console.info(`on drag`, map);
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
                    destinations.map((destination, index) => (
                        <Marker
                            lat={destination?.geometry?.location ? destination.geometry.location.lat() : 0}
                            lng={destination?.geometry?.location ? destination.geometry.location.lng() : 0}
                            text={destination.name}
                            type={mode.id}
                            key={index}
                        />
                    ))
                }
            </Map>
            {searchStatus && <MapStatus message={searchStatus}/>}
        </Box>
    )
}

export default MapView;