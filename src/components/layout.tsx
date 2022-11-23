import {Box} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";
import Nav from "./Nav/Nav";

const Layout = ( props:React.ComponentProps<any> ) => {
	const [hydrated, setHydrated] = useState(false);
	const isTabletOrMobile = useMediaQuery(
		{maxWidth:1224, orientation: "portrait"},
		hydrated ? undefined : { width: 1224 }
	);
	
	useEffect(() => {
		setHydrated(true);//this will only get triggered once the user is in the browser. 11.18.22 KL
	}, []);
	
	return (
			isTabletOrMobile ? (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "stretch",
						paddingRight: 2,
						paddingLeft: 2
					}}
				>
					{props.children}
				</Box>
			) : (
				<Box
					sx={{display: "flex"}}
				>
					<Nav/>
					<Box
						sx={{
							display: "flex",
							flexGrow: 1
						}}
					>
						{props.children}
					</Box>
				</Box>
			)
	)
}

export default Layout;