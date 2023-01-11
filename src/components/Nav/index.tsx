import React, {useContext, useState} from "react";
import {Drawer, List, Paper, BottomNavigation, BottomNavigationAction} from "@mui/material";
import {views, View, ViewContext, ViewUpdateContext} from "../../providers/Navigation/views";
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

    const {view, setView} = useContext(ViewContext);
    const navUpdated = (e:React.SyntheticEvent, value:View) => {
        // console.info(`${loggingTag}[val:${value}] event:`, e);
        console.info(`navUpdated new val:`, value);
        setView(value);
    };

    if(isPhoneOrTablet){
        return (
            <Paper
                sx={{
                    zIndex: 1,
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0
                }}
                elevation={3}
            >
                <BottomNavigation
                    showLabels
                    value={view}
                    onChange={navUpdated}
                >
                    {
                        views.map((view, index) => (
                            <BottomNavigationAction
                                key={view.id}
                                label={view.label}
                                icon={view.icon}
                                value={view}
                            />
                        ))
                    }
                </BottomNavigation>
            </Paper>
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
                        views.map((view:View, index: number) => (
                            <NavItem
                                key={`${view.id}-${index}`}
                                view={view}
                            />
                        ))
                    }
                </List>
            </Drawer>
        )
    }
}

export default Nav