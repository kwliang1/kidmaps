import React, {useContext, useEffect, useState, useCallback, useRef} from "react";
import PlacesList from "../../../components/PlacesList";

const PlacesListView = (props: React.ComponentProps<any>) => {
    const loggingTag = `[PlacesList]`;

    const [error, setError] = useState<google.maps.places.PlacesServiceStatus | null>(null);

    return (
        <PlacesList
            error={error}
        />
    )
}

export default PlacesListView;