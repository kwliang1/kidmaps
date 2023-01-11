import React, {Reducer} from "react";
import { createContext, useReducer } from "react";
import { PlaceSearchResult } from "../../../utils/PlacesSearch";

enum PlacesActionType {
    Add = 'add',
    Replace = 'replace',
    Empty = 'empty'
}

interface PlacesAction {
    type: string;
    places?: PlaceSearchResult[]
}

export const PlacesContext = createContext<PlaceSearchResult[]>([]);
export const PlacesDispatchContext = createContext<React.Dispatch<PlacesAction>>((a:PlacesAction) => undefined);

export function PlacesProvider(props: React.PropsWithChildren) {
    const {children} = props;
    const [places, dispatch] = useReducer(
        placesReducer,
        initialPlaces
    )
    return (
        <PlacesContext.Provider value={places}>
            <PlacesDispatchContext.Provider value={dispatch}>
                {children}
            </PlacesDispatchContext.Provider>
        </PlacesContext.Provider>
    )
}

function placesReducer(places:PlaceSearchResult[], action:PlacesAction):PlaceSearchResult[]{
    switch (action.type) {
        case PlacesActionType.Add : {
            return [
                ...places,
            ]
        }
        case PlacesActionType.Replace : {
            const {places:newPlaces} = action;
            if(newPlaces)
                return newPlaces;
            else
                return places;
        }
        case PlacesActionType.Empty : {
            return [];
        }
        default: {
            throw Error(`Unknown action: ${action.type}`);
        }
    }
}

const initialPlaces:PlaceSearchResult[] = [];