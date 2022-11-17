import type { NextPage } from 'next'
import { useState } from "react";
import {Box, Drawer} from "@mui/material";
import Nav from "../src/components/Nav/Nav";
import Map from "../src/components/Map/Map";
import {NavContextProvider} from "../src/providers/Navigation/Navigation";

const navWidth = 200;

const Home: NextPage = () => {
  return (
      <NavContextProvider>
          <Box
              sx={{display: "flex"}}
          >
              <Nav width={navWidth}/>
              <Map left={navWidth}/>
          </Box>
      </NavContextProvider>

  )
}

export default Home
