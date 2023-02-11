import {Box} from "@mui/material";
import React from "react";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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