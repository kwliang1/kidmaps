import React from "react";
import {Box, CircularProgress, Typography} from "@mui/material";

type PendingComponentProps = {
    text: string
} & React.ComponentProps<any>;
const Pending = (props: PendingComponentProps) => {
    const {text = 'Getting results...'} = props;
    return(
        <>
            <Box
                sx={{
                    marginBottom: 3
                }}
            >
                <Typography>{text}</Typography>
            </Box>
            <CircularProgress
                size={30}
            />
        </>
    )
}

export default Pending;