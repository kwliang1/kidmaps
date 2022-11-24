import React from "react";
import {Box} from "@mui/material";
import ItemDistance from "./ItemDistance";
import ItemRating from "./ItemRating";
import {Ratings} from "./ItemAction";


interface ItemActionsInterface extends React.ComponentProps<any>{
    directions?: google.maps.DirectionsLeg | null;
    ratings?: object | undefined;
}

const ItemActions = (props:ItemActionsInterface) => {
    const loggingTag = `[ItemActions]`;

    const {ratings, directions} = props;

    return(
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            {ratings && <ItemRating ratings={ratings}/>}
            {directions && <ItemDistance directions={directions}/>}
        </Box>
    )
}

export default ItemActions;