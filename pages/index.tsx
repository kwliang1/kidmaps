import type { NextPage } from 'next';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import Nav from "../src/components/Nav/Nav";
import Map from "../src/components/Map/Map";
import { NavContextProvider } from "../src/providers/Navigation/Navigation";

const navWidth = 200;

const Home: NextPage = () => {
    const [hydrated, setHydrated] = useState(false);
    const isTabletOrMobile = useMediaQuery(
{query: '(max-width: 1224px)'},
hydrated ? undefined : { width: 1224 }
    );

    useEffect(() => {
        setHydrated(true);//this will only get triggered once the user is in the browser. 11.18.22 KL
    }, []);

    return (
      <NavContextProvider>
          {
              isTabletOrMobile ? (
                  <Box>wah</Box>
              ):(
                  <Box
                      sx={{display: "flex"}}
                  >
                      <Nav width={navWidth}/>
                      <Map left={navWidth}/>
                  </Box>
              )
          }
      </NavContextProvider>
    )
}

export default Home
