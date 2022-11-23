import {useEffect, useState} from "react";
import {Drawer, List, ListItemButton, ListItemText, Box, Chip} from "@mui/material";
import {ReactPropTypes, useContext} from "react";
import {Mode, NavCtx} from "../../providers/Navigation/Navigation";
import {appModes} from "../../providers/Navigation/Navigation";
import {useTheme} from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery";

interface NavItemProps {
    key: string,
    mode: Mode
}

const NavItem = (props: NavItemProps) => {
    const loggingTag = `[NavItem]`;
    const {mode} = props;
    const {mode:activeMode, updateMode} = useContext(NavCtx);
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        // console.info(`${loggingTag} is active? `, activeMode.id === mode.id);
        setIsActive(activeMode.id === mode.id);
    }, [activeMode]);

    const theme = useTheme(),
        isPhoneOrTablet = useMediaQuery(theme.breakpoints.down("sm"));

    const navItemOnClick = () => {
        updateMode(mode);
    }
    // console.info(`${loggingTag} mode`, activeMode);

    if(isPhoneOrTablet){
        return (
            <Chip
                onClick={navItemOnClick}
                label={mode.name}
                variant={isActive? "filled" : "outlined"}
                color={"primary"}
                sx={{
                    margin: "0px 4px"
                }}
            />
        )
    } else {
        return (
            <ListItemButton
                onClick={navItemOnClick}
            >
                <ListItemText
                    sx={{
                        '& .MuiListItemText-primary':{
                            fontWeight: isActive ? "bold" : "default"
                        }
                    }}
                >{mode.name}</ListItemText>
            </ListItemButton>
        )
    }
}

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
                    justifyContent: "center"
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