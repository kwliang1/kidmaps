import React, {useContext} from "react";
import {Box, Typography} from "@mui/material";
import VerticalCenter from "../../components/Utils/VerticalCenter";
import PermissionPrompt from "../../components/Permission";
import {useLocationPermission} from "../../providers/Location/LocationContext";

const Home = (props: React.PropsWithChildren) => {
    const loggingTag = `[Home]`;
    const permission = useLocationPermission();
    console.info(`${loggingTag} permission: ${permission}`);
    return (
        <Box
            sx={{
                height: "100vh",
                padding: "2rem"
            }}
        >
            <VerticalCenter
                height={"100%"}
            >
                <Typography
                    variant={"h1"}
                    sx={{

                        fontSize: "2.5rem",
                        textAlign: "center",
                        marginBottom: "2rem"
                    }}
                >Welcome to KidsMap</Typography>
                {
                    permission === "prompt" ? (
                        <PermissionPrompt/>
                    ) : (
                        <Typography>Unexpected permission: <b>{permission}</b></Typography>
                    )
                }
            </VerticalCenter>
        </Box>
    )
}

export default Home;