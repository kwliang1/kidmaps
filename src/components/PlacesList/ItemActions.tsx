import React from "react";
import {Box} from "@mui/material";
import ItemDistance from "./ItemDistance";
import ItemRating from "./ItemRating";


interface ItemActionsInterface extends React.ComponentProps<any>{
    directions: google.maps.DirectionsLeg | null;
}

const ItemActions = (props:ItemActionsInterface) => {
    const loggingTag = `[ItemActions]`;

    const {ratings, directions} = props;

    return(
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2
            }}
        >
            {ratings && <ItemRating ratings={ratings}/>}
            {directions && <ItemDistance directions={directions}/>}
        </Box>
    )
}

export default ItemActions;