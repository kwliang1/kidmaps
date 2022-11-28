import React from "react";
import {CardMedia, Box} from "@mui/material";
import Image from "next/image";

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
            image={src}
            height={180}
            alt={alt}
        />
    )
}

export default ItemMedia;