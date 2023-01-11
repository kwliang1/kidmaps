import {useContext} from "react";
import {PlacesContext} from "../../../providers/Places";

const PlacesList = () => {
    const loggingTag = `[PlacesList]`;
    const places = useContext(PlacesContext);
    console.info(`${loggingTag} places`, places);

    return(
        <div>places</div>
    )
}

export default PlacesList;