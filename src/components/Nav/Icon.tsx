import React from "react";
import {Wc, Park} from "@mui/icons-material";
import {PlaceFilter} from "../../providers/Navigation/filters";

interface NavIconInterface extends React.PropsWithChildren {
    id: PlaceFilter["id"];
}
const NavIcon = (props: NavIconInterface) => {
    const {id} = props;

    if(id === "bathrooms"){
        return(<Wc/>)
    } else {
        return(<Park/>)
    }
}

export default NavIcon;