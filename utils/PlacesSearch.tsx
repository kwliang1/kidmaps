/* global google*/

import { Coords } from "google-map-react";

interface SearchRequirements {
	requestOptions: SearchRequestOptions;
}

interface SearchRequestOptions {
	keyword: string;
	type: string;
	rankBy?: google.maps.places.RankBy;
	bounds?: google.maps.LatLngBounds;
	location?: Coords | google.maps.LatLng;
	radius?: number;
}

interface PlaceSearchResult extends google.maps.places.PlaceResult {

}

interface BathroomInterface extends PlaceSearchResult {
	public: boolean;
	paid: boolean;
}


class PlacesSearch {

	results: PlaceSearchResult[];
	map: any | null;
	tag: string;

	constructor(map:any | null) {
		this.map = map;
		this.results = [];
		this.tag = `[PlacesSearch]`
	}

	byKeyword(requirements: SearchRequirements):Promise<google.maps.places.PlaceResult[] | null> {
		const loggingTag = `${this.tag}[${requirements.requestOptions.keyword}]`;
		return new Promise<google.maps.places.PlaceResult[] | null>((resolve, reject) => {
			const service = new google.maps.places.PlacesService(this.map),
				options = {
					openNow: true,
					rankBy: google.maps.places.RankBy.PROMINENCE,
					...requirements.requestOptions,
				};

			console.info(`${loggingTag} final request options`, options);

			service.nearbySearch(options, (
				results: google.maps.places.PlaceResult[] | null,
				status: google.maps.places.PlacesServiceStatus,
				pagination: google.maps.places.PlaceSearchPagination | null
			) => {
				try {
					if (status !== "OK" || !results) {
						// console.error(`${loggingTag} Error! status: ${status}`);
						// if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
						// 	// alert(`No results found!`);
						// }
						reject(status);
						return;
					}
					console.info(`${loggingTag} resp`, results);
					resolve(results);
				} catch (e) {
					reject(e);
				}
			});
		});
	}
}

class BathroomsSearch extends PlacesSearch {

	async byKeyword(requirements:SearchRequirements):Promise<google.maps.places.PlaceResult[] | null> {
		const results = await super.byKeyword(requirements);
		if(results){
			this.results = this.validatePlaces(results);
		}
		return this.results;
	}

	validatePlaces(places: google.maps.places.PlaceResult[]){
		return places.filter(place => {
			return this.isValidBathroom(place);
		});
	}

	isValidBathroom(place: google.maps.places.PlaceResult){
		const bathroomPlaceTypes = ["point_of_interest", "establishment"];
		return typeof place.types === "object" && place.types.length === bathroomPlaceTypes.length && place.types.every((value, index) => value === bathroomPlaceTypes[index]);
	}

}

class Bathroom implements BathroomInterface {
	public: boolean;
	paid: boolean;

	constructor() {
		this.public = false;
		this.paid = false;
	}

	set updatePublic(newValue: boolean){
		if(this.public !== newValue){
			this.public = newValue;
		}
	}

	set updatePaid(newValue: boolean){
		if(this.paid !== newValue){
			this.paid = newValue;
		}
	}

}

export {PlacesSearch, BathroomsSearch};