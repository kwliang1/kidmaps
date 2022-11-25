import type { NextPage } from 'next';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from "react";

import Index from "../src/components/Layout";
import MapView from "../src/views/Map";
import PlacesListView from "../src/views/PlacesList";
import { NavContextProvider } from "../src/providers/Navigation";
import { UserContextProvider } from "../src/providers/User";


const Home: NextPage = () => {
    const [hydrated, setHydrated] = useState(false);
    const isTabletOrMobile = useMediaQuery(
{maxWidth:1224, orientation: "portrait"},
hydrated ? undefined : { width: 1224 }
    );

    useEffect(() => {
        setHydrated(true);//this will only get triggered once the user is in the browser. 11.18.22 KL
    }, []);

    return (
        <UserContextProvider>
            <NavContextProvider>
                <Index>
                    {
                        isTabletOrMobile ? (
                            <PlacesListView/>
                        ):(
                            <MapView/>
                        )
                    }
                </Index>
            </NavContextProvider>
        </UserContextProvider>
    )
}

export default Home;
