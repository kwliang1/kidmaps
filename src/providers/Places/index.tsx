import React, {createContext, useCallback, useContext, useEffect, useReducer} from "react";
import {BathroomsSearch, PlaceSearchResult, PlacesSearch} from "../../../utils/PlacesSearch";
import {MapsCtx, MapsLibLoadStatuses} from "../Maps";
import {NavCtx} from "../Navigation";
import {UserCtx} from "../User";

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
    const {map} = useContext(MapsCtx);
    const {location} = useContext(UserCtx);
    const {filter} = useContext(NavCtx);

    const getDestinations = useCallback( () => {
        console.info(`[getDestinations] mode:`, filter);
        const search = filter.id === "bathrooms" ? new BathroomsSearch(map)
            : new PlacesSearch(map);

        search?.byKeyword({
            requestOptions : {
                id: filter.id,
                keyword: filter.keyword,
                type: filter.type,
                location: location,
                rankBy: google.maps.places.RankBy.DISTANCE
            }
        })
            .then(( results: (PlaceSearchResult[] | null)) => {
                if(
                    results &&
                    dispatch
                ){
                    console.info(`Place Search results`, results);
                    // updateDestinations(results);
                    dispatch({
                        type: 'replace',
                        places: results
                    });
                }
            })
            .catch(e => {
                if(e === google.maps.places.PlacesServiceStatus.ZERO_RESULTS){

                    dispatch({
                        type: "empty"
                    })
                }
                console.error(e);
            })
    }, [location, filter.id, filter.keyword, filter.type, map]);

    useEffect(() => {
        if(map){
            getDestinations();
        }
    }, [map, filter, location]);

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