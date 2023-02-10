import React, {ReactElement} from "react";
import ItemAction, {Action} from "../Action";
import {DirectionsWalk} from "@mui/icons-material";

const defaultDistanceDurationObj = {
    text: '',
    value: 0
}

class Distance implements Action {
    icon: ReactElement;
    name: string;
    value: string;
    distance: google.maps.Distance;

    constructor(distance:(google.maps.Distance | undefined), duration: google.maps.Duration | undefined){
        this.icon = <DirectionsWalk fontSize={"small"}/>
        this.name = "Distance";
        this.value = duration ? duration.text : '';
        this.distance = distance ? distance : defaultDistanceDurationObj;
    }
}

interface ItemDistanceInterface extends React.ComponentProps<any>{
    directions: google.maps.DirectionsLeg;
}

const ItemDistance = (props:ItemDistanceInterface) => {
    const {directions} = props;

    return(
        <ItemAction info={new Distance(directions.distance, directions.duration)}/>
    )
}

export default ItemDistance;