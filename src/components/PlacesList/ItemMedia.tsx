import React from "react";
import {CardMedia} from "@mui/material";

interface ItemMediaInterface extends React.ComponentProps<any>, google.maps.places.PlacePhoto {
    alt: string;
    src?: string;
}

const ItemMedia = (props:ItemMediaInterface) => {
    const {alt} = props;
    const src = props?.src ? props.src : props.getUrl({maxHeight:140});
    return(
        <CardMedia
            component={"img"}
            height={180}
            alt={alt}
            image={src}
        />
    )
}

export default ItemMedia;