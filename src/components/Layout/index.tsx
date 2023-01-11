import {Box} from "@mui/material";
import React, {useContext} from "react";
import Nav from "../Nav";
import PlacesView from "../../views/Places";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {UserCtx} from "../../providers/User";

const defaultContainerStyle = {
	display: "flex",
}

const Index = (props: React.PropsWithChildren) => {

	const theme = useTheme(),
		isTabletOrMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const {children} = props;
	const containerStyles = isTabletOrMobile ? {
		...defaultContainerStyle,
        flexDirection: "column",
		        alignItems: "stretch",
		        maxHeight: "100vh"
	} : {
		...defaultContainerStyle,
	};

	return (
		<Box
			sx={containerStyles}
		>
			{children}
		</Box>
	)
}

export default Index;