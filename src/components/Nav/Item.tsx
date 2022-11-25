import {Mode, NavCtx} from "../../providers/Navigation";
import {useContext, useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Chip, ListItemButton, ListItemText} from "@mui/material";

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
    }, [activeMode.id, mode.id]);

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

export default NavItem;