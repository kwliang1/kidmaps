import React from "react";
import { useState, createContext, useCallback, useMemo} from "react";
import {PlaceFilter, placeFilters} from "./filters";
import {View, views} from "./views";

interface NavigationContextInterface {
    filter: PlaceFilter;
    view: View;
    updateMode: Function;
}

const defaultNavContext: NavigationContextInterface = {
    filter: placeFilters[0],
    view: views[0],
    updateMode: (): void  => {},
}

const NavCtx = createContext<NavigationContextInterface>(defaultNavContext as NavigationContextInterface);

const NavContextProvider = (props: React.PropsWithChildren) => {
    const loggingTag = `[NavContextProvider]`;
    console.info(`${loggingTag} props`, props);
    const initialMode = placeFilters[0]
    console.info(`${loggingTag} initial mode`, initialMode);
    const [filter, setFilter] = useState(initialMode);
    const [view, setView] = useState(views[0]);

    const updateMode = useCallback((newMode: PlaceFilter) => {
        console.info(`setting new mode!`, newMode);
        setFilter(newMode);
    }, []);

    const contextValue = useMemo(() => ({
        filter: filter,
        view,
        updateMode
    }), [filter, updateMode]);
    return (
        <NavCtx.Provider value={contextValue}>
            {props.children}
        </NavCtx.Provider>
    )
}
export {NavCtx, NavContextProvider};