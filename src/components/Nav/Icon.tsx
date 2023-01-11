import {Map, ViewList} from "@mui/icons-material";

const NavIcon = (id:any) => {
    if(id === "map"){
        return(<Map/>)
    } else {
        return(<ViewList/>)
    }
}

export default NavIcon;