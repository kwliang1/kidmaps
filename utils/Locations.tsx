/* global google*/

import { Coords } from "google-map-react";

interface SearchRequirements {
	request_options: SearchRequestOptions;
	map: any | null;//defined in google maps react types unfortunately
}

interface SearchRequestOptions {
	keyword: string;
	type: string;
	bounds?: google.maps.LatLngBounds;
	location?: Coords | google.maps.LatLng;
	radius?: number;
}

const searchByKeyword = (requirements: SearchRequirements) => {
	const {map} = requirements;
	const loggingTag = `[searchByKeyword][${requirements.request_options.keyword}]`;
	return new Promise<google.maps.places.PlaceResult[] | object>((resolve, reject) => {

		const service = new google.maps.places.PlacesService(map),
			options = {
				...requirements.request_options,
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

export {searchByKeyword};