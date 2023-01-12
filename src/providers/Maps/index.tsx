import {createContext, useMemo, useState} from "react";
import KidsMap from "../../components/Map";
import {Props} from "google-map-react";
enum MapsLibLoadStatuses {
    UNKNOWN = "unknown",
    PENDING = "pending",
    SUCCESS = "success",
    ERROR = "error"
}

interface MapsContextInterface {

}

const MapsContext = createContext<MapsContextInterface | null>(null);
const MapsProvider = (props: React.PropsWithChildren) => {
    const loggingTag = `[MapsProvider]`;
    const {children} = props;
    const [libLoadStatus, setLibLoadStatus] = useState(MapsLibLoadStatuses.UNKNOWN);
    const [map, setMap] = useState(null);
    // @ts-ignore
    function handleGoogLoaded ({map} = {}): void {
        if(map){
            setLibLoadStatus(MapsLibLoadStatuses.SUCCESS);
            console.info(`${loggingTag} Google api loaded!`, map);
            setMap(map);
        }
    }
    const context = useMemo(() => {
        console.info(`${loggingTag} updating context inside of useMemo`);
        return {
            loaded: libLoadStatus,
            map
        }
    }, [libLoadStatus, map]);

    return (
        <MapsContext.Provider value={context}>
            <KidsMap
                onGoogleApiLoaded={handleGoogLoaded}
            />
            {children}
        </MapsContext.Provider>
    )
}

export default MapsProvider;