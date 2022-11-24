import React, {ReactElement} from "react";
import {Star} from "@mui/icons-material";
import {Box, Typography} from "@mui/material";

export interface Action {
    icon: ReactElement;
    name: string;
    value: number | string;
    count?: number;
}

export class Ratings implements Action {
    icon: ReactElement;
    name: string;
    value: number;
    count?: number;

    constructor(count = 0, value = 0) {
        this.icon = <Star fontSize={"small"}/>;
        this.name = 'Ratings';
        this.value = value;
        this.count = count;
    }
}

interface ItemActionInterface extends React.ComponentProps<any>{

}

const ItemAction = (props:ItemActionInterface) => {
    const {info} = props;
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center"
            }}
        >
            <Typography>{info.value}</Typography>
            <Box
                sx={{
                    margin: "0px 2px"
                }}
            >
                {info.icon}
            </Box>
            {info.distance && <Typography>({info.distance.text})</Typography>}
            {info.count && <Typography>({info.count})</Typography>}
        </Box>
    )
}

export default ItemAction;