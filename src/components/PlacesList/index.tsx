import React, {useRef} from "react";
import Nav from "../Nav";
import {Box, Typography} from "@mui/material";
import PlacesListItem from "./Item";
import PlacesPending from "./Pending";
import PlacesSearchError from "./PlacesSearchError";
import VerticalCenter from "../Utils/VerticalCenter";

interface PlacesListInterface extends React.ComponentProps<any> {
    places: google.maps.places.PlaceResult[] | undefined;
    error?: google.maps.places.PlacesServiceStatus | null;
}

const PlacesList = (props:PlacesListInterface) => {
    const {places, error} = props;
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                maxHeight: "100vh"
            }}
        >
            <Nav/>
            <Box
                sx={{
                    overflowY: "auto",
                    paddingRight: 2,
                    paddingLeft: 2,
                    paddingTop: 2
                }}
            >
                {/*<Box>*/}
                    {
                        (Array.isArray(places) && places.length > 0) ? places.map((place, index) => (
                            <PlacesListItem
                                key={index}
                                place={place}
                            />
                        )) : (
                            <VerticalCenter
                                height={300}
                            >
                                {
                                    error ? (
                                        <PlacesSearchError
                                            error={error}
                                        />
                                    ) : (
                                        <PlacesPending/>
                                    )
                                }
                            </VerticalCenter>
                        )

                    }
                {/*</Box>*/}
            </Box>
        </Box>
    )
}

export default PlacesList;