import React from "react";
import { useState, createContext, useCallback, useMemo} from "react";

export interface Mode {
    id: string,
    name: string,
    keyword: string
}
export class AppMode implements Mode {
    _id: string;
    _name: string;
    _keyword: string;
    constructor(id: string, name: string, keyword: string) {
        this._id = id;
        this._name = name;
        this._keyword = keyword;
    }

    get id(){
        return this._id;
    }
    get name(){
        return this._name;
    }
    get keyword(){
        return this._keyword;
    }
}

interface NavigationContextInterface {
    mode: Mode;
    updateMode: Function;
}

const appModes: Mode[] = [
    {
        name: "Parks",
        id: "parks",
        keyword: "parks"
    },
    {
        name: "Bathrooms",
        id: "bathrooms",
        keyword: "bathrooms"
    },
    {
        name: "Ice Cream",
        id: "ice_cream",
        keyword: "ice cream"
    },
    {
        name: "Restaurants",
        id: "restaurants",
        keyword: "burritos"
    }
]


class Navigation {
    _modes:Array<Mode>;
    constructor(){
        this._modes = [
            new AppMode("parks", "Parks", "parks")
        ]
    }
    getModeByID(id:string) {
        let result;
        console.info(`modes`, this._modes);
        this._modes.every((mode:Mode) => {
            console.info(`id: ${id} mode_id: ${mode.id}`);
            if(mode.id === id){
                console.info(`returning id: ${mode}`);
                result = mode;
            }
        })
        return result;
    }
}

const defaultNavContext: NavigationContextInterface = {
    mode: appModes[0],
    updateMode: (): void  => {},
}

const NavCtx = createContext<NavigationContextInterface>(defaultNavContext as NavigationContextInterface);

const NavContextProvider = (props: React.PropsWithChildren) => {
    const navigation = new Navigation();
    const initialMode = appModes[0]
    console.info(`initial mode`, initialMode);
    const [mode, setMode] = useState(initialMode);

    const updateMode = useCallback((newMode: Mode) => {
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