import React from "react";
import {Card, CardContent, CardHeader, CardMedia} from "@mui/material";
import ItemMedia from "./ItemMedia";



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

    // console.info(`${loggingTag} place`, place);

    return (
        <Card
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
                {place.vicinity}
            </CardContent>
        </Card>
    )
}

export default PlacesListItem;