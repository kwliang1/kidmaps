import {Container, Box, Card, CardHeader, CardContent} from "@mui/material";
import React, {useContext, useState, useEffect} from "react";
import {UserCtx} from "../../providers/User/User";
import {NavCtx} from "../../providers/Navigation/Navigation";
import GoogleMapReact, {Coords} from "google-map-react";
import {searchByKeyword} from "../../../utils/Locations";
import Nav from "../Nav/Nav";

interface DestinationItemProps extends React.ComponentProps<any>{
    destination: google.maps.places.PlaceResult
}

const DestinationItem = (props: DestinationItemProps) => {
    const loggingTag = `[DestinationItem]`;
    console.info(`${loggingTag} props`, props);
    const {destination} = props;
    return (
        <Card
            sx={{
                marginBottom: 1
            }}
            variant={"outlined"}
        >
            <CardHeader
                title={destination.name}
            />
            <CardContent>
                Address: {destination.vicinity}
            </CardContent>
        </Card>
    )
}

const DestinationList = (props: React.ComponentProps<any>) => {
    const loggingTag = `[DestinationList]`;

    const userContext = useContext(UserCtx);
    const {mode} = useContext(NavCtx);
    const [map, setMap] = useState();
    const [center, setCenter] = useState<Coords>();
    const [destinations, setDestinations] = useState<google.maps.places.PlaceResult[] | object>();

    useEffect(() => {
        console.info(`${loggingTag} setting center to`, userContext.location.coordinates);
        setCenter(userContext.location.coordinates);
    }, [userContext]);

    // @ts-ignore
    const handleGoogLoaded = ({map} = {}) => {
        if(map){
            setMap(map);
            console.info(`${loggingTag} Google api loaded!`, map);
        }
    }

    const getDestinations = async () => {
        const results = await searchByKeyword({
            map,
            request_options : {
                keyword: mode.keyword,
                type: mode.type,
                location: center,
                radius: 3200//approx. 2 miles
            }
        });

        setDestinations(results);
    }

    useEffect(() => {
        if(map){
            getDestinations();
        }
    }, [map, mode]);

    console.info(`${loggingTag} user context`, userContext);
    console.info(`${loggingTag} center`, center);
    return (
        <>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.NEXT_PUBLIC_GOOG_MAPS_API_KEY,
                    libraries: ['places']
                }}
                center={center}
                defaultZoom={17}
                onGoogleApiLoaded={handleGoogLoaded}
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    paddingRight: 2,
                    paddingLeft: 2
                }}
            >
                <Nav/>
                <Box>
                    {
                        Array.isArray(destinations) ? destinations.map((destination, index) => (
                            <DestinationItem key={index} destination={destination}/>
                        )) : <></>
                    }
                </Box>
            </Box>
        </>
    )
}

export default DestinationList;