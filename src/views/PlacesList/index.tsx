import React, {useContext, useEffect, useState, useCallback} from "react";
import Map from "../../components/Map";
import {UserCtx} from "../../providers/User";
import {NavCtx} from "../../providers/Navigation";
import {Coords} from "google-map-react";
import {BathroomsSearch, PlaceSearchResult, PlacesSearch} from "../../../utils/PlacesSearch";
import PlacesList from "../../components/PlacesList";

const PlacesListView = (props: React.ComponentProps<any>) => {
    const loggingTag = `[PlacesList]`;
    const userContext = useContext(UserCtx);
    const {mode} = useContext(NavCtx);
    const [map, setMap] = useState();
    const [center, setCenter] = useState<Coords>();
    const [destinations, setDestinations] = useState<google.maps.places.PlaceResult[]>();

    useEffect(() => {
        console.info(`${loggingTag} setting center to`, userContext.location.coordinates);
        setCenter(userContext.location.coordinates);
    }, [userContext, loggingTag]);

    // @ts-ignore
    const handleGoogLoaded = ({map} = {}) => {
        if(map){
            console.info(`${loggingTag} Google api loaded!`, map);
            setMap(map);
        }
    }

    const getDestinations = useCallback( () => {
        const search = mode.id === "bathrooms" ? new BathroomsSearch(map)
            : new PlacesSearch(map);

        setDestinations([]);

        search?.byKeyword({
            requestOptions : {
                id: mode.id,
                keyword: mode.keyword,
                type: mode.type,
                location: center,
                rankBy: google.maps.places.RankBy.DISTANCE
            }
        })
        .then(( results: (PlaceSearchResult[] | null)) => {
            console.info(`Is Array?:${Array.isArray(results)} destination results`, results);
            if(results){
                updateDestinations(results);
            }
        })
        .catch(e => {
            console.error(e);
        })
    }, [center, mode.id, mode.keyword, mode.type, map]);

    const updateDestinations = useCallback((results: PlaceSearchResult[]) => {
        const loggingTag = `[updateDestinations]`;
        if(
            Array.isArray(results) &&
            results.length > 0 &&
            (results[0]?.id === mode.id)
        ){
            console.info(`${loggingTag} results id: ${results[0].id}, mode id: ${mode.id}, check:${results[0]?.id === mode.id}`)
            setDestinations(results);
        }
    },[]);//intentionally setting no dependencies so that we will only render the results for the latest mode.


    useEffect(() => {
        if(map){
            getDestinations();
        }
    }, [map, getDestinations, mode]);

    return (
        <>
            <Map
                center={center}
                onGoogleApiLoaded={handleGoogLoaded}
            />
            <PlacesList
                places={destinations}
            />
        </>
    )
}

export default PlacesListView;