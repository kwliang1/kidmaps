import React from "react";
import Nav from "../Nav/Nav";
import {Box} from "@mui/material";
import PlacesListItem from "./Item";

interface PlacesListInterface extends React.ComponentProps<any> {
    places: google.maps.places.PlaceResult[] | undefined
}

const PlacesList = (props:PlacesListInterface) => {
    const {places} = props;
    return (
        <>
            <Nav/>
            <Box>
                {
                    Array.isArray(places) && places.map((place, index) => (
                        <PlacesListItem
                            key={index}
                            place={place}
                        />
                    ))
                }
            </Box>
        </>
    )
}

export default PlacesList;