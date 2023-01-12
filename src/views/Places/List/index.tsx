import React, {useContext, useEffect, useState, useCallback, useRef} from "react";
import Map from "../../../components/Map";
import {UserCtx} from "../../../providers/User";
import {NavCtx} from "../../../providers/Navigation";
import {Coords} from "google-map-react";
import {BathroomsSearch, PlaceSearchResult, PlacesSearch} from "../../../../utils/PlacesSearch";
import PlacesList from "../../../components/PlacesList";
import {PlacesDispatchContext} from "../../../providers/Places";

const PlacesListView = (props: React.ComponentProps<any>) => {
    const loggingTag = `[PlacesList]`;
    const {location} = useContext(UserCtx);
    const {filter} = useContext(NavCtx);
    const updatePlaces = useContext(PlacesDispatchContext);
    const currentModeID = useRef(filter.id);
    const [map, setMap] = useState();
    const [center, setCenter] = useState<Coords>();
    const [error, setError] = useState<google.maps.places.PlacesServiceStatus | null>(null);

    useEffect(() => {
        if(location){
            console.info(`${loggingTag} setting center to`, location);
            setCenter(location);
        }
    }, [location, loggingTag]);

    useEffect(()=>{
        //keep[ing the current mode ID up to date
        currentModeID.current = filter.id;
    }, [filter.id]);

    // @ts-ignore
    const handleGoogLoaded = ({map} = {}) => {
        if(map){
            console.info(`${loggingTag} Google api loaded!`, map);
            setMap(map);
        }
    }

    const getDestinations = useCallback( () => {
        console.info(`[getDestinations] mode:`, filter);
        const search = filter.id === "bathrooms" ? new BathroomsSearch(map)
            : new PlacesSearch(map);

        setError(null);

        search?.byKeyword({
            requestOptions : {
                id: filter.id,
                keyword: filter.keyword,
                type: filter.type,
                location: center,
                rankBy: google.maps.places.RankBy.DISTANCE
            }
        })
        .then(( results: (PlaceSearchResult[] | null)) => {
            if(
                results &&
                updatePlaces
            ){
                console.info(`Place Search results`, results);
                // updateDestinations(results);
                updatePlaces({
                    type: 'replace',
                    places: results
                });
            }
        })
        .catch(e => {
            if(e === google.maps.places.PlacesServiceStatus.ZERO_RESULTS){
                setError(e);
                updatePlaces({
                    type: "empty"
                })
            }
            console.error(e);
        })
    }, [center, filter.id, filter.keyword, filter.type, map]);

    useEffect(() => {
        if(map){
            getDestinations();
        }
    }, [map, getDestinations, filter]);

    return (
        <>
            <Map
                center={center}
                onGoogleApiLoaded={handleGoogLoaded}
            />
            <PlacesList
                error={error}
            />
        </>
    )
}

export default PlacesListView;