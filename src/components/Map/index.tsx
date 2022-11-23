import React from "react";
import GoogleMapReact, {Props, Coords} from "google-map-react";
interface MapComponentProps extends React.ComponentProps<any>, Props{
    center?: Coords;
}

const defaultMapProps:MapComponentProps = {
    bootstrapURLKeys: {
        key: process.env.NEXT_PUBLIC_GOOG_MAPS_API_KEY,
        libraries: ['places']
    },
    center: {
        lat: 0,
        lng: 0
    },
    zoom: 17,
    layerTypes: ['TransitLayer'],
}

const Map = (props:MapComponentProps) => {
    // const loggingTag = `[Map]`
    // console.info(`${loggingTag} props`, props);
    return (
        <GoogleMapReact
            bootstrapURLKeys={props.bootstrapURLKeys}
            center={props.center}
            defaultZoom={props.zoom}
            layerTypes={props.layerTypes}
            onGoogleApiLoaded={props.onGoogleApiLoaded}
            {...(props.onChange && {onChange:props.onChange})}
            {...(props.onDrag && {onDrag:props.onDrag})}
        >
            {props.children}
        </GoogleMapReact>
    )
}

Map.defaultProps = defaultMapProps;

export default Map;