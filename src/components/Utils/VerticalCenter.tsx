import React from "react";
import {Box} from "@mui/material";

interface VerticalCenterInterface extends React.ComponentProps<any>{
    height?: number | string;
}

const VerticalCenter = (props: VerticalCenterInterface) => {
    const {height, children} = props;
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: height ? height : "auto"
            }}
        >
            {children}
        </Box>
    )
}

export default VerticalCenter;