export interface PlaceFilter {
    id: string;
    name: string;
    keyword: string;
    type: string;
}

export const placeFilters: PlaceFilter[] = [
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
    // {
    //     name: "Treats",
    //     id: "ice_cream",
    //     keyword: "ice cream cupcakes cakes",
    //     type: "point_of_interest"
    // },
    // {
    //     name: "Restaurants",
    //     id: "restaurants",
    //     keyword: "restaurants",
    //     type: "restaurant"
    // }
]
