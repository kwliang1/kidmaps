import type { NextPage } from 'next';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import Nav from "../src/components/Nav/Nav";
import Layout from "../src/components/layout";
import MapView from "../src/views/Map";
import PlacesListView from "../src/views/PlacesList";
import { NavContextProvider } from "../src/providers/Navigation/Navigation";
import {UserContextProvider} from "../src/providers/User/User";
import DestinationList from "../src/components/DestinationList/DestinationList";

const navWidth = 200;

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
                <Layout>
                    {
                        isTabletOrMobile ? (
                            <PlacesListView/>
                        ):(
                            <MapView/>
                        )
                    }
                </Layout>

            </NavContextProvider>
        </UserContextProvider>
    )
}

export default Home
