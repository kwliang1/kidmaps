import React from "react";
import {CardMedia, Box} from "@mui/material";
import Image from "next/image";

interface OptimizedImageInterface extends React.ComponentProps<any>{

}

const OptimizedImage = (props: OptimizedImageInterface) => {
    const loggingTag = `[OptimizedImage]`;
    const {url, alt, height} = props;
    console.info(`${loggingTag} props`, props);
    // "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAW30NDwuIjA8B5JyieXCWWD8l9IJvfJaeAFbUQsamQSiNWYD3Wb_BgF0VbAGnlCTwUbE1Yh7GVdpC02YmwBleqXey4cDvf9tdSL7WBrN_FPjVesx4poKfmwFhs6oCmbDLYjsW5mAD19hCIsbK4hNgRVLNF-T96JH8u23MRfmbv9zkEu16ctQ&4u140&5m1&2e1&callback=none&key=AIzaSyAsicyXxjlKdmikI3FSeNCiPbILUC4lmzA&token=70161"

    return(
        <Box
            sx={{
                height: height,
                width: "100%",
                position: "relative"
            }}
        >
            <Image
                layout={"fill"}
                src={url}
                alt={alt}
            />
        </Box>
    )
}

interface ItemMediaInterface extends React.ComponentProps<any>, google.maps.places.PlacePhoto {
    alt: string;
    src?: string;
}

const ItemMedia = (props:ItemMediaInterface) => {
    const {alt} = props;
    const src = props?.src ? props.src : props.getUrl({maxHeight:140});
    return(
        <CardMedia
            sx={{
                width: '200px',
                position: "relative"
            }}
            component={OptimizedImage}
            height={180}
            alt={alt}
            url={src}
            image={src}
        />
    )
}

export default ItemMedia;