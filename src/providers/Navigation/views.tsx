import {Map, ViewList} from "@mui/icons-material";
import React, {ReactElement, createContext, useState, useEffect} from "react";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export interface View {
    id: string;
    label: string;
    icon: ReactElement;
}

export const views: View[] = [
    {
        id: "list",
        label: "List",
        icon: <ViewList/>
    },
    {
        id: "map",
        label: "Map",
        icon: <Map/>
    },
]

export interface ViewContextInterface {
    view: View;
    setView: React.Dispatch<React.SetStateAction<View>>;
}
const defaultViewContext = {
    view: views[0],
    setView: ()=>((a:View)=>a)
}
export const ViewContext = createContext<ViewContextInterface>(defaultViewContext);
export const ViewUpdateContext = createContext<React.Dispatch<React.SetStateAction<View>>>(()=>(a:View) => a);


interface ViewProviderInterface extends React.PropsWithChildren {
}
export function ViewProvider(props: ViewProviderInterface){
    const loggingTag = `[ViewProvider]`;
    const {children} = props;

    const theme = useTheme(),
        isTabletOrMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // const [view, setView] = useState(isTabletOrMobile ? views[0] : views[1]);
    const [view, setView] = useState(views[0]);

    useEffect(()=>{
        console.info(`${loggingTag} view updated: ${view}`);
    }, [view, isTabletOrMobile]);

    console.info(`${loggingTag} re-rendered. isTabletOrMobile?: `, isTabletOrMobile);

    return (
        <ViewContext.Provider value={{view, setView}}>
            {children}
        </ViewContext.Provider>
    )
}