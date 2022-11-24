import React, {useRef} from "react";
import Nav from "../Nav";
import {Box} from "@mui/material";
import PlacesListItem from "./Item";


interface PlacesListInterface extends React.ComponentProps<any> {
    places: google.maps.places.PlaceResult[] | undefined
}

const PlacesList = (props:PlacesListInterface) => {
    const {places} = props;
    const ref = useRef(null)
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

            </Box>
        </Box>
    )
}

export default PlacesList;