import {NavCtx} from "../../providers/Navigation";
import {useContext, useEffect, useState} from "react";
import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";

import {PlaceFilter} from "../../providers/Navigation/filters";
import NavIcon from "./Icon";

interface NavItemProps {
    key: string,
    value: PlaceFilter
}

const NavItem = (props: NavItemProps) => {
    const loggingTag = `[NavItem]`;
    const {value} = props;
    const {filter:activeMode, updateMode} = useContext(NavCtx);

    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        // console.info(`${loggingTag} is active? `, activeMode.id === mode.id);
        setIsActive(activeMode.id === value.id);
    }, [activeMode.id, value.id]);

    const navItemOnClick = () => {
        updateMode(value);
    }
    // console.info(`${loggingTag} mode`, activeMode);

    return (
        <ListItemButton
            onClick={navItemOnClick}
        >
            <ListItemIcon>
                {<NavIcon id={value.id}/>}
            </ListItemIcon>
            <ListItemText
                sx={{
                    '& .MuiListItemText-primary':{
                        fontWeight: isActive ? "bold" : "default"
                    }
                }}
            >{value.name}</ListItemText>
        </ListItemButton>
    )
}

export default NavItem;