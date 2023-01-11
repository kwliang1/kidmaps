import type { NextPage } from 'next';
import Index from "../src/components/Layout";
import { NavContextProvider } from "../src/providers/Navigation";
import { UserContextProvider } from "../src/providers/User";
import {PlacesProvider} from "../src/providers/Places";
import {ViewProvider} from "../src/providers/Navigation/views";

import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";


const Home: NextPage = () => {
    const loggingTag = `[Home]`;

    const theme = useTheme(),
        isTabletOrMobile = useMediaQuery(theme.breakpoints.down("sm"));

    console.info(`${loggingTag} render`, isTabletOrMobile);

    return (
        <UserContextProvider>
            <NavContextProvider>
                <ViewProvider
                    isTabletOrMobile={isTabletOrMobile}
                >
                    <PlacesProvider>
                        <Index
                            isTabletOrMobile={isTabletOrMobile}
                        >
                        </Index>
                    </PlacesProvider>
                </ViewProvider>
            </NavContextProvider>
        </UserContextProvider>
    )
}

export default Home;
