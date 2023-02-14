import React, {PropsWithChildren} from "react";
import PlacesList from "../../../components/Places/List";

const PlacesListView = (props: PropsWithChildren) => {
    // const loggingTag = `[PlacesList]`;
    //
    // const [error, setError] = useState<google.maps.places.PlacesServiceStatus | null>(null);

    return (
        <PlacesList/>
    )
}

export default PlacesListView;