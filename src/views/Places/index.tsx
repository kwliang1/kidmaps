import React, {useContext} from "react";
import {ViewContext} from "../../providers/Navigation/views";
import MapView from "./Map";
import ListView from "./List";
interface PlacesViewPropsInterface extends React.PropsWithChildren{
    isTabletOrMobile: boolean
}
const PlacesView = (props: PlacesViewPropsInterface) => {
    const loggingTag = `[PlacesView]`;
    const {view} = useContext(ViewContext);
    console.info(`${loggingTag} re-rendering. current view:`, view);
    if(view.id === "map"){
        return (
            <MapView/>
        )
    } else {
        return (
            <ListView/>
        )
    }

}

export default PlacesView;