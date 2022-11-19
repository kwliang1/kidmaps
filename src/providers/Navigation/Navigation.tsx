import React from "react";
import { useState, createContext, useCallback, useMemo} from "react";

export interface Mode {
    id: string;
    name: string;
    keyword: string;
    type: string;
}

const appModes: Mode[] = [
    {
        name: "Parks",
        id: "parks",
        keyword: "parks",
        type: "park"
    },
    {
        name: "Bathrooms",
        id: "bathrooms",
        keyword: "bathrooms",
        type: "point_of_interest"
    },
    {
        name: "Ice Cream",
        id: "ice_cream",
        keyword: "ice cream",
        type: "restaurant"
    },
    {
        name: "Restaurants",
        id: "restaurants",
        keyword: "restaurants",
        type: "restaurant"
    }
]

interface NavigationContextInterface {
    mode: Mode;
    updateMode: Function;
}

const defaultNavContext: NavigationContextInterface = {
    mode: appModes[0],
    updateMode: (): void  => {},
}

const NavCtx = createContext<NavigationContextInterface>(defaultNavContext as NavigationContextInterface);

const NavContextProvider = (props: React.PropsWithChildren) => {
    const initialMode = appModes[0]
    console.info(`initial mode`, initialMode);
    const [mode, setMode] = useState(initialMode);

    const updateMode = useCallback((newMode: Mode) => {
        console.info(`setting new mode!`, newMode);
        setMode(newMode);
    }, []);

    const contextValue = useMemo(() => ({
        mode,
        updateMode
    }), [mode, updateMode]);
    return (
        <NavCtx.Provider value={contextValue}>
            {props.children}
        </NavCtx.Provider>
    )
}
export {NavCtx, NavContextProvider, appModes};