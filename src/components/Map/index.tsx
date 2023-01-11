import React from "react";
import GoogleMapReact, {Props} from "google-map-react";
interface MapComponentProps extends React.ComponentProps<any>, Props {

}

const defaultMapProps:MapComponentProps = {
    bootstrapURLKeys: {
        key: process.env.NEXT_PUBLIC_GOOG_MAPS_API_KEY,
        libraries: ['places', 'geometry']
    },
    center: {
        lat: 0,
        lng: 0
    },
    zoom: 17,
    layerTypes: ['TransitLayer'],
}

const KidsMap = (props:MapComponentProps) => {
    const loggingTag = `[KidsMap]`
    // console.info(`${loggingTag} props`, props);
    return (
        <GoogleMapReact
            bootstrapURLKeys={props.bootstrapURLKeys}
            center={props.center}
            defaultZoom={props.zoom}
            layerTypes={props.layerTypes}
            onGoogleApiLoaded={props.onGoogleApiLoaded}
            {...(props.onChange && {onChange: props.onChange})}
            {...(props.onDrag && {onDrag:props.onDrag})}
        >
            {props.children}
        </GoogleMapReact>
    )
}

KidsMap.defaultProps = defaultMapProps;

export default KidsMap;