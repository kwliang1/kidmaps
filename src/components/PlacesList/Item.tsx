import React from "react";
import {Card, CardContent, CardHeader} from "@mui/material";

interface PlacesListItemProps extends React.ComponentProps<any>{
    place: google.maps.places.PlaceResult
}

const PlacesListItem = (props: PlacesListItemProps) => {
    const loggingTag = `[PlacesListItem]`;
    // console.info(`${loggingTag} props`, props);
    const {place} = props;

    // const getDistanceToDestination = useCallback(() => {
    //     const
    // }, []);

    return (
        <Card
            sx={{
                marginBottom: 1
            }}
            variant={"outlined"}
        >
            <CardHeader
                title={place.name}
            />
            <CardContent>
                Address: {place.vicinity}
            </CardContent>
        </Card>
    )
}

export default PlacesListItem;