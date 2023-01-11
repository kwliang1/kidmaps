/* global google*/

import { Coords } from "google-map-react";

interface SearchRequirements {
	requestOptions: SearchRequestOptions;
}

interface SearchRequestOptions {
	id: string;
	keyword: string;
	type: string;
	rankBy?: google.maps.places.RankBy;
	bounds?: google.maps.LatLngBounds;
	location?: Coords | google.maps.LatLng;
	radius?: number;
}

export interface PlaceSearchResult extends google.maps.places.PlaceResult {
	id: string;
}

interface BathroomInterface extends PlaceSearchResult {
	public: boolean;
	paid: boolean;
}


class PlacesSearch {

	results: PlaceSearchResult[];
	map: any | null;
	tag: string;
	pending: boolean;

	constructor(map:any | null, tag?: string) {
		this.map = map;
		this.results = [];
		this.pending = false;
		this.tag = tag ? tag : `[PlacesSearch]`;
	}

	byKeyword(requirements: SearchRequirements):Promise<PlaceSearchResult[] | null> {
		const loggingTag = `${this.tag}[${requirements.requestOptions.keyword}]`;
		return new Promise<PlaceSearchResult[] | null>((resolve, reject) => {
			this.pending = true;
			try {
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
							reject(status);
							return;
						}
						console.info(`${loggingTag} resp`, results);
						const updatedResults = results.map(result => {
							const finalResult: PlaceSearchResult = {
								...result,
								id: options.id
							}
							return finalResult;
						});

						resolve(updatedResults);
					} catch (e) {
						reject(e);
					}
				});
			} catch(e){
				reject(e);
			} finally {
				this.pending = false;
			}
		});
	}

}

class BathroomsSearch extends PlacesSearch {

	constructor(map:any | null) {
		super(map, '[BathroomsSearch]');
	}
	async byKeyword(requirements:SearchRequirements):Promise<PlaceSearchResult[] | null> {
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

class Bathroom implements BathroomInterface {
	id: string;
	public: boolean;
	paid: boolean;

	constructor(id:string) {
		this.id = id;
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