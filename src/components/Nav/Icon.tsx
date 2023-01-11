import {Map, ViewList} from "@mui/icons-material";
import {PlaceFilter} from "../../providers/Navigation";

const NavIcon = (id:any) => {
    if(id === "map"){
        return(<Map/>)
    } else {
        return(<ViewList/>)
    }
}

export default NavIcon;