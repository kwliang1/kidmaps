
import {Drawer, List, ListItemButton, ListItemText} from "@mui/material";
import {ReactPropTypes, useContext} from "react";
import {Mode, NavCtx} from "../../providers/Navigation/Navigation";
import {appModes} from "../../providers/Navigation/Navigation";

interface NavItemProps {
    key: string,
    mode: Mode
}
const NavItem = (props: NavItemProps) => {
    const {mode} = props;
    const {mode:activeMode, updateMode} = useContext(NavCtx);
    console.info(`[Nav] mode`, activeMode);
    return (
        <ListItemButton
            onClick={()=>{updateMode(mode.id)}}
        >
            <ListItemText
                sx={{
                    '& .MuiListItemText-primary':{
                        fontWeight: activeMode.id === mode.id ? "bold" : "default"
                    }
                }}
            >{mode.name}</ListItemText>
        </ListItemButton>
    )
}

interface NavProps {
    width: number
}

const Nav = (props : NavProps) => {
    const { width } = props;

    return (
         <Drawer
            variant={"permanent"}
            anchor={"left"}
            sx={{
                width,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width
                }
            }}
        >
             <List>
                 {
                     appModes.map((mode, index: number) => (
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

export default Nav