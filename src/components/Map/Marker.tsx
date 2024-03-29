import React from "react";
import {Box, Tooltip} from "@mui/material";
import {Stroller, LocalDining, Park, Wc, Icecream} from "@mui/icons-material";
import {red} from '@mui/material/colors';

class MarkerStyles {
    private readonly _color = "#FFFFFF";
    private readonly _type:string;
    constructor(type:string) {
        this._type = type;
    }
    get bg_color(){
        if(this._type === "parks"){
            return "green"
        } else if (this._type === "bathroom"){
            return "blue";
        } else if (this._type === "ice_cream"){
            return "pink";
        } else if (this._type === "restaurants"){
            return red['A400'];
        } else {
            return "red";
        }
    }
    get color(){
        return this._color;
    }
    get type(){
        return this._type;
    }
    get icon(){
        if(this._type === "parks"){
            return <Park sx={{color:this._color}}/>
        } else if (this._type === "bathrooms"){
            return <Wc sx={{color:this._color}}/>
        } else if (this._type === "ice_cream"){
            return <Icecream sx={{color: this._color}}/>
        } else if (this._type === "restaurants"){
            return <LocalDining sx={{color: this._color}}/>
        } else {
            return <Stroller sx={{color:this._color}}/>
        }
    }
}

interface MarkerInterface extends React.ComponentProps<any>{
    type: string;
    text: string | undefined;
    lat: number;
    lng: number;
}

const Marker = (props: MarkerInterface) => {
    // console.info(`mapmarker type: ${type}`);
    const {type, text, lat, lng} = props;
    const marker = new MarkerStyles(type);
    // console.info(`marker color: ${marker.color} type: ${marker.type}`);
    return (
        <Tooltip title={text}>
            <Box
                sx={{
                    display: 'inline-flex',
                    justifyContent: "center",
                    padding: '10px',
                    alignItems: "center",
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: marker.bg_color,
                    borderRadius: '50%',
                    ':hover': {
                        cursor: "pointer"
                    }
                }}
            >
                {marker.icon}
            </Box>
        </Tooltip>
    )
}

Marker.defaultProps = {
    text: ""
};

export default Marker;