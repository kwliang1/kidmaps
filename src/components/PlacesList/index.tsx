import React, {useContext, useRef} from "react";
import Nav from "../Nav";
import {Box, Typography} from "@mui/material";
import PlacesListItem from "./Item";
import PlacesPending from "./Pending";
import PlacesSearchError from "./PlacesSearchError";
import VerticalCenter from "../Utils/VerticalCenter";
import {PlacesContext} from "../../providers/Places";

interface PlacesListInterface extends React.ComponentProps<any> {
    error?: google.maps.places.PlacesServiceStatus | null;
}

const PlacesList = (props:PlacesListInterface) => {
    const {error} = props;
    const places = useContext(PlacesContext);
    return (
        <Box
            sx={{
                overflowY: "auto",
                paddingRight: 2,
                paddingLeft: 2,
                paddingTop: 2,
                paddingBottom: 7
            }}
        >
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
        </Box>
    )
}

export default PlacesList;