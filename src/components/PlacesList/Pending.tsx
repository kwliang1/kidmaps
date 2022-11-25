import React from "react";
import {Box, CircularProgress, Typography} from "@mui/material";

const Pending = (props: React.ComponentProps<any>) => {
    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '300px'
            }}
        >
            <Box
                sx={{
                    marginBottom: 3
                }}
            >
                <Typography>Getting results...</Typography>
            </Box>
            <CircularProgress
                size={30}
            />
        </Box>
    )
}

export default Pending;