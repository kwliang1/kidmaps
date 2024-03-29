import React, {useContext} from "react";
import {Box} from "@mui/material";
import PlacesListItem from "./Item";
import PlacesPending from "../Status/Pending";
import PlacesSearchError from "../Status/Error";
import VerticalCenter from "../../Utils/VerticalCenter";
import {PlacesContext} from "../../../providers/Places";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import EmptyResults from "../Status/Empty";
import {PlaceSearchResult} from "../../../../data/Places/Results";

interface PlacesListInterface extends React.ComponentProps<any> {
    error?: google.maps.places.PlacesServiceStatus | null;
}

const PlacesList = (props:PlacesListInterface) => {
    const loggingTag = `[PlacesList]`;
    const places = useContext(PlacesContext);
    //temporary
    const error = null;

    console.info(`${loggingTag} places`, places);
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: "56px"
            }}
        >
            <Swiper
                style={{
                    height: "100%",
                    width: "100%"
                }}
                direction={"vertical"}
                slidesPerView={1}
                className={"mySwiper"}
            >
                {
                    (Array.isArray(places) && places.length > 0) ? places.map((place:PlaceSearchResult, index) => (
                        <SwiperSlide key={place.place_id}>
                            <PlacesListItem
                                place={place}
                            />
                        </SwiperSlide>

                    )) : (
                        <SwiperSlide>
                            <VerticalCenter
                                height={'100%'}
                            >
                                {
                                    error ? (
                                        <PlacesSearchError
                                            error={error}
                                        />
                                    ) : places === "pending" ? (
                                        <PlacesPending/>
                                    ) : (
                                        <EmptyResults/>
                                    )
                                }
                            </VerticalCenter>
                        </SwiperSlide>
                    )

                }
            </Swiper>
        </Box>
    )
}

export default PlacesList;