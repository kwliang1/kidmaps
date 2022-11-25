
import {Drawer, List, Box} from "@mui/material";
import {Mode} from "../../providers/Navigation";
import {appModes} from "../../providers/Navigation";
import {useTheme} from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery";
import NavItem from "./Item";

interface NavProps {
    width?: number
}

const Nav = (props : NavProps) => {
    const loggingTag = `[Nav]`;
    const theme = useTheme(),
        isPhoneOrTablet = useMediaQuery(theme.breakpoints.down("sm"));

    console.info(`${loggingTag} phone or tablet`, isPhoneOrTablet);

    if(isPhoneOrTablet){
        return (
            <Box
                sx={{
                    display: "flex",
                    paddingTop: 2,
                    paddingBottom: 2,
                    justifyContent: "center",
                    borderBottom: "1px solid #e0e0e0"
                }}
            >
                {
                    appModes.map((mode, index) => (
                        <NavItem
                            key={`${mode.id}-${index}`}
                            mode={mode}
                        />
                    ))
                }
            </Box>
        )
    } else {
        const width = 200;//desktop view nav width
        return (
            <Drawer
                variant={"permanent"}
                anchor={"left"}
                sx={{
                    width,
                    display: {
                        xs: "none",
                        sm: "block"
                    },
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width
                    }
                }}
            >
                <List>
                    {
                        appModes.map((mode: Mode, index: number) => (
                            <NavItem
                                key={`${mode.id}-${index}`}
                                mode={mode}
                            />
                        ))
                    }
                </List>
            </Drawer>
        )
    }
}

export default Nav