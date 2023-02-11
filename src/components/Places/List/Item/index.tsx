import React, {useEffect, useCallback, useContext, useState} from "react";
import {Card, CardContent, CardHeader, CardActions, Typography, Box, Button} from "@mui/material";
import ItemMedia from "./Media/ItemMedia";
import ItemActions from "./Actions/ItemActions";
import { useInView } from "react-intersection-observer";
import {UserCtx} from "../../../../providers/User";
import DirectionsUrl from "../../../../../data/Directions";


interface PlacesListItemProps extends React.ComponentProps<any>{
    place: google.maps.places.PlaceResult
}

const PlacesListItem = (props: PlacesListItemProps) => {
    const loggingTag = `[PlacesListItem]`;

    // console.info(`${loggingTag} props`, props);

    const {place} = props;
    const {location} = useContext(UserCtx);
    const [directions, setDirections] = useState<google.maps.DirectionsLeg | null>(null);
    const {ref, inView, entry} = useInView({
        threshold: 0,
        delay: 250,
        triggerOnce: true
    });

    const getDistanceToDestination = useCallback(() => {
        if(place?.geometry?.location && location){
            let service = new google.maps.DirectionsService();
            service.route({
                origin: location,
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
    }, [location, loggingTag, place?.geometry?.location, place.name]);

    useEffect(() => {
        if(inView){
            getDistanceToDestination();
        }
    }, [inView, getDistanceToDestination, loggingTag, place.name])

    const openDirectionsUrl = useCallback(() => {
        if(place?.geometry?.location && location){
            const url = new DirectionsUrl(location, place.geometry.location, place.place_id);
            window.open(url.href);
        }
    }, [place?.geometry?.location, place.place_id, location]);

    return (
        <Card
            ref={ref}
            sx={{
                height: "100%",
                position: "relative",
                marginBottom: 2
            }}
            variant={"outlined"}
        >
            {place?.photos && place.photos.map((photo, index) => {
                const id = `${place.place_id}`;
                const imageSrc = photo.getUrl({
                    maxHeight: window.innerHeight
                })
                return(
                    <Box
                        key={id}
                        sx={{
                            position: "absolute",
                            top:0,
                            left:0,
                            right:0,
                            bottom:0,
                            backgroundImage: `url(${imageSrc})`,
                            backgroundSize: "cover"
                        }}
                    >
                    </Box>
                )
            })}
            <Box
                sx={{
                    zIndex: 1,
                    position: "absolute",
                    bottom:0,
                    left:0,
                    right:0,
                    color: "white",
                    backgroundColor: `rgba(0,0,0,0.4)`
                }}
            >
                <CardHeader
                    title={place.name}
                />
                <CardContent>
                    <ItemActions
                        ratings={{
                            count: place.user_ratings_total,
                            value: place.rating
                        }}
                    />
                    <Typography >{place.vicinity}</Typography>
                    <ItemActions
                        directions={directions}
                    />
                </CardContent>
                <CardActions
                    sx={{
                        paddingLeft: 2,
                        paddingBottom: 2
                    }}
                >
                    <Button variant={"contained"} onClick={openDirectionsUrl}>Directions</Button>
                </CardActions>
            </Box>
        </Card>
    )
}

//https://www.google.com/maps/dir/181+Front+St+Brooklyn,+181+Front+St,+Brooklyn,+NY+11201,+United+States/Bar+and+Grill+Park,+Pearl+Street,+Brooklyn,+NY/@40.7019995,-73.9884626,18z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x89c25a339ff58bf3:0x4f379ecac70269d7!2m2!1d-73.9861995!2d40.7025418!1m5!1m1!1s0x89c25a34062cb4df:0xc27537226e3b3c1b!2m2!1d-73.9881696!2d40.7014482!3e2

export default PlacesListItem;