import {Box} from "@mui/material";
import React from "react";
import Nav from "../Nav";
import PlacesView from "../../views/Places";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const defaultContainerStyle = {
	display: "flex",
}

const Index = (props:any) => {

	const theme = useTheme(),
		isTabletOrMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
			<Nav/>
			<PlacesView
				isTabletOrMobile={isTabletOrMobile}
			/>
		</Box>
	)
}

export default Index;