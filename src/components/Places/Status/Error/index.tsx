import React, {useState, useEffect} from "react";
import {Box, Typography} from "@mui/material";

interface PlacesSearchErrorInterface extends React.ComponentProps<any>{
    error: google.maps.places.PlacesServiceStatus;
}

const PlacesSearchError = (props:PlacesSearchErrorInterface) => {
    const [content, setContent] = useState<string>('');
    const {error} = props;

    useEffect(()=>{
        if(error === google.maps.places.PlacesServiceStatus.ZERO_RESULTS){
            setContent('No results found');
        } else {
            setContent(`Unrecognized error received: "${error}"`);
        }
    }, []);


    return (
        <Typography>{content}</Typography>
    )
}

export default PlacesSearchError;