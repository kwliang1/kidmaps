import React, {useCallback, useContext} from "react";
import {Button, Box, Typography} from "@mui/material";
import VerticalCenter from "../../components/Utils/VerticalCenter";
import {UserCtx} from "../../providers/User";
import PermissionPrompt from "../../components/Permission";

interface HomeComponentInterface {

}
const Home = (props: HomeComponentInterface) => {

    const {permission} = useContext(UserCtx);

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