import React, {useContext, useEffect, useState, useCallback} from "react";
import Map from "../../components/Map";
import {UserCtx} from "../../providers/User/User";
import {NavCtx} from "../../providers/Navigation/Navigation";
import {Coords} from "google-map-react";
import {BathroomsSearch, PlacesSearch} from "../../../utils/PlacesSearch";
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
    }, [userContext]);

    // @ts-ignore
    const handleGoogLoaded = ({map, maps} = {}) => {
        // console.info(`${loggingTag} geometry?`, maps);
        if(map){
            setMap(map);
            console.info(`${loggingTag} Google api loaded!`, map);
        }
    }

    const getDestinations = useCallback( () => {
        const search = mode.id === "bathrooms" ? new BathroomsSearch(map)
            : new PlacesSearch(map);

        search?.byKeyword({
            requestOptions : {
                keyword: mode.keyword,
                type: mode.type,
                location: center,
                rankBy: google.maps.places.RankBy.DISTANCE
                // radius: 3200//approx. 2 miles
            }
        })
        .then(results => {
            console.info(`${Array.isArray(results)} destination results`, results);
            if(Array.isArray(results)){
                setDestinations(results);
            }
            // if(results.length > 0){
            //     const test = results[0];
            //     console.info(`${loggingTag} test`, test);
            //     //getting directions for a specific destination!q
            //     let service = new google.maps.DirectionsService();
            //     service.route({
            //         origin: center,
            //         destination: test.geometry.location,
            //         travelMode: google.maps.DirectionsTravelMode.WALKING//default to walking
            //     }, (resp) => {
            //         console.info(`${loggingTag} directions:`, resp);
            //     })
            // }
        })
        .catch(e => {
            console.error(e);
        })

    }, [center, mode, map]);

    useEffect(() => {
        if(map){
            getDestinations();
        }
    }, [map, getDestinations, mode]);

    // useEffect(() => {
    //     if(map){
    //         console.info(`setting search...`);
    //         setSearch(new PlacesSearch(map));
    //     }
    // }, [map]);



    return (
        <>
            <Map
                center={center}
                onGoogleApiLoaded={handleGoogLoaded}
            />
            <PlacesList places={destinations}/>
        </>
    )
}

export default PlacesListView;