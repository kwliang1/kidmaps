/* global google*/

import { Coords } from "google-map-react";

interface SearchRequirements {
	requestOptions: SearchRequestOptions;
	map: any | null;//defined in google maps react types unfortunately
}

interface SearchRequestOptions {
	keyword: string;
	type: string;
	bounds?: google.maps.LatLngBounds;
	location?: Coords | google.maps.LatLng;
	radius?: number;
}

interface Destination extends google.maps.places.PlaceResult {

}

interface BathroomInterface extends Destination {
	public: boolean;
	paid: boolean;
}


class Destinations {
	_destinations: Destination[];
	constructor(destinations=[]) {
		this._destinations = destinations;
	}
	get destinations(){
		return this._destinations;
	}
	byKeyword(requirements: SearchRequirements):Promise<google.maps.places.PlaceResult[] | null> {
		const {map} = requirements;
		const loggingTag = `[${requirements.requestOptions.keyword}]`;
		return new Promise<google.maps.places.PlaceResult[] | null>((resolve, reject) => {

			const service = new google.maps.places.PlacesService(map),
				options = {
					...requirements.requestOptions,
					type: "point_of_interest"
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
						if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
							// alert(`No results found!`);
						}
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

class Bathrooms extends Destinations {
	async search(requirements:SearchRequirements){
		const results = await this.byKeyword(requirements);
	}
	async searchByKeyword(requirements:SearchRequirements){
		const results = await this.byKeyword(requirements);
		if(results){
			this._destinations = this.validatePlaces(results);
		}
	}
	validatePlaces(places: google.maps.places.PlaceResult[]){
		let validPlaces = [...places];
		validPlaces.filter(place => {
			return this.isValidBathroom(place);
		});
		return validPlaces;
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

class Restaurants extends Destinations {

}

class Parks extends Destinations {

}

class IceCreamPlaces extends Destinations {

}

const searchByKeyword = (requirements: SearchRequirements) => {
	const {map} = requirements;
	console.info(requirements);
	const loggingTag = `[searchByKeyword][${requirements.requestOptions.keyword}]`;
	return new Promise<google.maps.places.PlaceResult[] | object>((resolve, reject) => {

		const service = new google.maps.places.PlacesService(map),
			options = {
				...requirements.requestOptions,
				type: "point_of_interest"
			};

		console.info(`${loggingTag} final request options`, options);

		service.nearbySearch(options, (
			results: google.maps.places.PlaceResult[] | null,
			status: google.maps.places.PlacesServiceStatus,
			pagination: google.maps.places.PlaceSearchPagination | null
		) => {
			try{
				if(status !== "OK" || !results){
					// console.error(`${loggingTag} Error! status: ${status}`);
					if(status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS){
						// alert(`No results found!`);
					}
					reject(status);
					return;
				}
				console.info(`${loggingTag} resp`, results);
				if(options.keyword === "bathrooms"){
					const filteredResults = results.filter((place: google.maps.places.PlaceResult) => {
						const bathroomPlaceTypes = ["point_of_interest", "establishment"];
						return typeof place.types === "object" && place.types.length === bathroomPlaceTypes.length && place.types.every((value, index) => value === bathroomPlaceTypes[index]);
					})
					resolve(filteredResults);
				} else {
					resolve(results);
				}
			} catch(e){
				reject(e);
			}
		});
	});
}

export {searchByKeyword, Bathrooms, Restaurants, Parks, IceCreamPlaces};