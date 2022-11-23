import React, {useContext, useEffect, useState} from "react";
import Map from "../../components/Map";
import {UserCtx} from "../../providers/User/User";
import {NavCtx} from "../../providers/Navigation/Navigation";
import {Coords} from "google-map-react";
import {searchByKeyword} from "../../../utils/Locations";
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
        console.info(`${loggingTag} geometry?`, maps);
        if(map){
            setMap(map);
            console.info(`${loggingTag} Google api loaded!`, map);
        }
    }

    const getDestinations = async () => {
        const results = await searchByKeyword({
            map,
            requestOptions : {
                keyword: mode.keyword,
                type: mode.type,
                location: center,
                radius: 3200//approx. 2 miles
            }
        });


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
        console.info(`${Array.isArray(results)} destination results`, results);
        if(Array.isArray(results)){
            setDestinations(results);
        }
    }

    useEffect(() => {
        if(map){
            getDestinations();
        }
    }, [map, mode]);

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