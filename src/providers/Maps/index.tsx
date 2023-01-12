import {createContext, useMemo, useState} from "react";
import KidsMap from "../../components/Map";

export enum MapsLibLoadStatuses {
    UNKNOWN = "unknown",
    PENDING = "pending",
    SUCCESS = "success",
    ERROR = "error"
}

interface MapsContextInterface {
    loaded: MapsLibLoadStatuses;
    map?: any;
}

const defaultMapsContext : MapsContextInterface = {
    loaded: MapsLibLoadStatuses.UNKNOWN,
}
export const MapsCtx = createContext<MapsContextInterface>(defaultMapsContext);
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
    const context:MapsContextInterface = useMemo(() => {
        console.info(`${loggingTag} updating context inside of useMemo`);
        return {
            loaded: libLoadStatus,
            map
        }
    }, [libLoadStatus, map]);

    return (
        <MapsCtx.Provider value={context}>
            <KidsMap
                onGoogleApiLoaded={handleGoogLoaded}
            />
            {children}
        </MapsCtx.Provider>
    )
}

export default MapsProvider;