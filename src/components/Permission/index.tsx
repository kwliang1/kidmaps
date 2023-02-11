import React, {useCallback, useState} from "react";
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import {useLocationPermissionRequest} from "../../providers/Location/LocationContext";



const PermissionPrompt = () => {
    const requestPermission = useLocationPermissionRequest();
    const [status, setStatus] = useState("unknown");
    const getStarted = useCallback(() => {
        if(requestPermission){
            setStatus("pending");
            requestPermission();
        }
    }, [requestPermission]);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}
        >
            <Typography
                sx={{
                    fontWeight: 300,
                    marginBottom: 4,
                }}
            >We need your location to get started.</Typography>

            <Button
                variant={"contained"}
                onClick={getStarted}
                disabled={status === "pending"}
                sx={{
                    paddingTop: 1.5,
                    paddingBottom: 1.5
                }}
            >
                {status === "pending" ? <CircularProgress size={24}/> : "Get Started"}
            </Button>
        </Box>
    )
}

export default PermissionPrompt;