import {Box} from "@mui/material";
import React from "react";
import Nav from "../Nav";
import PlacesView from "../../views/Places";

const defaultContainerStyle = {
	display: "flex",
}

const Index = (props:any) => {
	const {children, isTabletOrMobile} = props;


	const containerStyles = isTabletOrMobile ? {
		...defaultContainerStyle,
        flexDirection: "column",
		        alignItems: "stretch",
		        maxHeight: "100vh"
	} : {
		...defaultContainerStyle,
	};
	return (
			// isTabletOrMobile ? (
				<Box
					sx={containerStyles}
				>
					<Nav/>
					<PlacesView
						isTabletOrMobile={isTabletOrMobile}
					/>
				</Box>
			// ) : (
			// 	<Box
			// 		sx={{
			// 			display: isTabletOrMobile ? "block" : "flex"
			// 	}}
			// 	>
			// 		<Nav/>
			// 		<Box
			// 			sx={{
			// 				display: "flex",
			// 				flexGrow: 1
			// 			}}
			// 		>
			// 			<PlacesView/>
			// 		</Box>
			// 	</Box>
			// )
	)
}

export default Index;