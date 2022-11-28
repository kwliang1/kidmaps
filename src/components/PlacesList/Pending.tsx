import React from "react";
import {Box, CircularProgress, Typography} from "@mui/material";

const Pending = (props: React.ComponentProps<any>) => {
    return(
        <>
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
        </>
    )
}

export default Pending;