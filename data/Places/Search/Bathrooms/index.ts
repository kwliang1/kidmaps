import {PlacesSearch, SearchRequestOptions} from "../index";
import {PlaceSearchResult} from "../../Results";

export class BathroomsSearch extends PlacesSearch {

    constructor(map:any | null) {
        super(map, '[BathroomsSearch]');
    }
    async byKeyword(requirements:SearchRequestOptions):Promise<PlaceSearchResult[] | null> {
        const results = await super.byKeyword(requirements);
        if(results){
            this.results = this.validatePlaces(results);
        }
        return this.results;
    }

    validatePlaces(places: PlaceSearchResult[]){
        return places.filter(place => {
            // console.info(`Is valid bathroom? ${this.isValidBathroom(place)}`);
            return this.isValidBathroom(place);
        });
    }

    isValidBathroom(place: PlaceSearchResult){
        const bathroomPlaceTypes = ["point_of_interest", "establishment"];
        return typeof place.types === "object" && place.types.length === bathroomPlaceTypes.length && place.types.every((value, index) => value === bathroomPlaceTypes[index]);
    }

}