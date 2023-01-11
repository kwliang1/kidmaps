import {NavCtx} from "../../providers/Navigation";
import {View, ViewContext} from "../../providers/Navigation/views";
import {useContext, useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {BottomNavigationAction, Chip, IconButton, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import NavIcon from "./Icon";

interface NavItemProps {
    key: string,
    view: View
}

const NavItem = (props: NavItemProps) => {
    const loggingTag = `[NavItem]`;
    const {view} = props;
    const {filter:activeMode, updateMode} = useContext(NavCtx);
    const {setView} = useContext(ViewContext);

    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        // console.info(`${loggingTag} is active? `, activeMode.id === mode.id);
        setIsActive(activeMode.id === view.id);
    }, [activeMode.id, view.id]);

    const theme = useTheme(),
        isPhoneOrTablet = useMediaQuery(theme.breakpoints.down("sm"));

    const navItemOnClick = () => {
        setView(view);
    }
    // console.info(`${loggingTag} mode`, activeMode);

    if(isPhoneOrTablet){
        return (
            <BottomNavigationAction
                label={view.label}
                icon={view.icon}
            />
        )
    } else {
        return (
            <ListItemButton
                onClick={navItemOnClick}
            >
                <ListItemIcon>
                    {view.icon}
                </ListItemIcon>
                <ListItemText
                    sx={{
                        '& .MuiListItemText-primary':{
                            fontWeight: isActive ? "bold" : "default"
                        }
                    }}
                >{view.label}</ListItemText>
            </ListItemButton>
        )
    }
}

export default NavItem;