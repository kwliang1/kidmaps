import React, {useContext, useState} from "react";
import {Drawer, List, Paper, BottomNavigation, BottomNavigationAction} from "@mui/material";
import {views, View, ViewContext} from "../../providers/Navigation/views";
import {PlaceFilter, placeFilters} from "../../providers/Navigation/filters";
import {useTheme} from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery";
import NavItem from "./Item";
import NavIcon from "./Icon";
import {NavContextProvider, NavCtx} from "../../providers/Navigation";

interface NavProps {
    width?: number
}

const Nav = (props : NavProps) => {
    const loggingTag = `[Nav]`;
    const theme = useTheme(),
        isPhoneOrTablet = useMediaQuery(theme.breakpoints.down("sm"));

    console.info(`${loggingTag} phone or tablet`, isPhoneOrTablet);

    const {filter, updateMode} = useContext(NavCtx);
    const navUpdated = (e:React.SyntheticEvent, value:View) => {
        // console.info(`${loggingTag}[val:${value}] event:`, e);
        console.info(`navUpdated new val:`, value);
        updateMode(value);
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
                    value={filter}
                    onChange={navUpdated}
                >
                    {
                        placeFilters.map((filter, index) => (
                            <BottomNavigationAction
                                key={filter.id}
                                label={filter.name}
                                icon={<NavIcon id={filter.id}/>}
                                value={filter}
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
                        placeFilters.map((filter:PlaceFilter, index: number) => (
                            <NavItem
                                key={`${filter.id}-${index}`}
                                value={filter}
                            />
                        ))
                    }
                </List>
            </Drawer>
        )
    }
}

export default Nav