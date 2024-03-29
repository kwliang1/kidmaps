import React, {useCallback, useContext, useEffect, useState} from "react";
import {ChangeEventValue, Coords} from "google-map-react";

import {Box} from "@mui/material";
import {NavCtx} from "../../../providers/Navigation";

import Map from "../../../components/Map";
import Marker from "../../../components/Map/Marker";
import MapStatus from "../../../components/Map/Status";

import {PlacesSearch} from "../../../../data/Places/Search";
import {PlacesContext, PlacesDispatchContext} from "../../../providers/Places";
import {BathroomsSearch} from "../../../../data/Places/Search/Bathrooms";
import {useCoords} from "../../../providers/Location/LocationContext";

interface MapViewProps extends React.PropsWithChildren {

}

const MapView = (props: MapViewProps) => {
    const location = useCoords();
    const {filter} = useContext(NavCtx);
    // console.info(`current user mode`, mode);
    const places = useContext(PlacesContext);
    const updatePlaces = useContext(PlacesDispatchContext);
    const [coordinates, setCoordinates] = useState<Coords|undefined>(location);
    const [map, setMap] = useState<google.maps.Map | undefined>();
    const [searchStatus, setSearchStatus] = useState<boolean | string>(false);

    const getDestinations = useCallback( () => {
        const loggingTag = `[getDestinations]`;
        if(map){//only call this function is usermap is available
            console.info(`${loggingTag} mode`, filter);
            const search = filter.id === "bathrooms" ? new BathroomsSearch(map)
                : new PlacesSearch(map);

            console.info(`${loggingTag} search`, search);

            let mapViewSearchRequirements = {
                id: filter.id,
                keyword: filter.keyword,
                type: filter.type,
                bounds: map.getBounds()
            };

            search?.byKeyword(mapViewSearchRequirements)
                .then(results => {
                    if(Array.isArray(results)) {
                        updatePlaces({
                            type: 'replace',
                            places: results
                        });
                        setSearchStatus(false);
                    }
                })
                .catch(e => {
                    console.error(`Error getting destinations`, e);
                    updatePlaces({type: 'empty'});
                    if(e === google.maps.places.PlacesServiceStatus.ZERO_RESULTS){
                        setSearchStatus(`No destinations found`);
                    }
                })
        }
    }, [filter, map]);

    useEffect(() => {
        if(map){
            getDestinations();
        }
    }, [map, getDestinations, coordinates]);

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
        if(places && places.length > 0){
            updatePlaces({type: 'empty'});
        }
    }, [places]);

    return (
        <Box
            component={"main"}
            sx={{
                flexGrow: 1,
                height: '100vh',
                paddingBottom: 7
            }}
        >
            <Map
                center={coordinates}
                onGoogleApiLoaded={handleGoogleApiResponse}
                onChange={handleOnChange}
                onDrag={handleOnDrag}
            >
                {
                    Array.isArray(places) &&
                    places.map((place, index) => (
                        <Marker
                            lat={place?.geometry?.location ? place.geometry.location.lat() : 0}
                            lng={place?.geometry?.location ? place.geometry.location.lng() : 0}
                            text={place.name}
                            type={filter.id}
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