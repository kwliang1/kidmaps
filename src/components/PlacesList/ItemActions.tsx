import React, {ReactElement} from "react";

import {Box, Tooltip, Typography} from "@mui/material";
import {Star} from "@mui/icons-material";


interface Action {
    icon: ReactElement;
    name: string;
    value: number;
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
        <Tooltip title={`${info.count} ${info.name}`}>
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
                <Typography>({info.count})</Typography>
            </Box>
        </Tooltip>
    )
}

interface ItemActionsInterface extends React.ComponentProps<any>{

}

const ItemActions = (props:ItemActionsInterface) => {
    const {ratings} = props;
    const ratingsInfo = new Ratings(ratings?.count, ratings?.value);
    return(
        <Box
            sx={{
                marginTop: 1
            }}
        >
            <ItemAction info={ratingsInfo}/>
        </Box>
    )
}

export default ItemActions;