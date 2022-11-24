import React, {useEffect, useCallback, useContext, useState} from "react";
import {Card, CardContent, CardHeader, Typography, Box} from "@mui/material";
import ItemMedia from "./ItemMedia";
import ItemActions from "./ItemActions";
import { useInView } from "react-intersection-observer";
import {UserCtx} from "../../providers/User/User";


interface PlacesListItemProps extends React.ComponentProps<any>{
    place: google.maps.places.PlaceResult
}

const PlacesListItem = (props: PlacesListItemProps) => {
    const loggingTag = `[PlacesListItem]`;

    // console.info(`${loggingTag} props`, props);

    const {place} = props;
    const user = useContext(UserCtx);
    const [directions, setDirections] = useState<google.maps.DirectionsLeg | null>(null);
    const {ref, inView, entry} = useInView({
        threshold: 0,
        delay: 1000,
        triggerOnce: true
    });

    const getDistanceToDestination = useCallback(() => {
        if(place?.geometry?.location){
            let service = new google.maps.DirectionsService();
            service.route({
                origin: user.location.coordinates,
                destination: place.geometry.location,
                travelMode: google.maps.TravelMode.WALKING//default to walking
            }, (resp: google.maps.DirectionsResult | null) => {
                if(resp){
                    console.info(`${loggingTag} route to "${place.name}":`, resp);
                    const {routes} = resp;
                    const {legs} = routes[0];
                    setDirections(legs[0]);
                }
            });
        }
    }, [user]);

    useEffect(() => {
        if(inView){
            getDistanceToDestination();
        }
        console.info(`${loggingTag} "${place.name}" view state: ${inView}`);
    }, [inView])

    // console.info(`${loggingTag} place`, place);

    return (
        <Card
            ref={ref}
            sx={{
                marginBottom: 2
            }}
            variant={"outlined"}
        >
            {place?.photos && place.photos.map((photo, index) => {
                const id = `${place.name}-${index}`;
                return(
                    <ItemMedia
                        alt={id}
                        key={id}
                        {...photo}
                    />
                )
            })}
            <CardHeader
                title={place.name}
            />
            <CardContent>
                <Typography>{place.vicinity}</Typography>
                <ItemActions
                    directions={directions}
                    ratings={{
                        count: place.user_ratings_total,
                        value: place.rating
                    }}
                />
            </CardContent>
        </Card>
    )
}

export default PlacesListItem;