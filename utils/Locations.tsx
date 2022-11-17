/* global google*/

import { Coords } from "google-map-react";

interface SearchRequirements {
	keyword: string;
	userMap: any | null;//defined in google maps react types unfortunately
	coordinates: Coords;
}

const searchByKeyword = (requirements: SearchRequirements) => {
	const {keyword, userMap, coordinates} = requirements;

	const loggingTag = `[searchByKeyword][${requirements.keyword}]`;
	return new Promise<google.maps.places.PlaceResult[] | object>((resolve, reject) => {

		const service = new google.maps.places.PlacesService(userMap),
			boundsforCurrentMap = userMap.getBounds();

		console.info(`${loggingTag} bounds`, boundsforCurrentMap);
		service.nearbySearch({
			keyword,
			bounds: boundsforCurrentMap,//added search by current bounds of the map 11.17.22 KL
			type: "point_of_interest"
		}, (
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
				if(keyword === "bathrooms"){
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

const searchForBathrooms = async (requirements:SearchRequirements) => {
	const loggingTag = `[searchForBathrooms]`;
	return await searchByKeyword(requirements);
}

const searchForParks = async (requirements:SearchRequirements) => {
	const loggingTag = `[searchForParks]`;
	return await searchByKeyword(requirements);
}

const searchForIceCream = async (requirements:SearchRequirements) => {
	const loggingTag = `[searchForBathrooms]`;
	return await searchByKeyword(requirements);
}

const searchForRestaurants = async (requirements:SearchRequirements) => {
	const loggingTag = `[searchForRestaurants]`;
	return await searchByKeyword(requirements);
}


class UserLocation {
	private readonly _localstorage_key: string;
	private _coordinates: Coords;
	constructor() {
		this._localstorage_key = `last_known_user_location`;
		this._coordinates = this.getLastKnownLocation();
	}

	get coordinates(){
		return this._coordinates;
	}

	set current(location:Coords){
		this._coordinates = location;
		this.cacheUserLastKnownLocation(location);
	}

	getLastKnownLocation(){
		let coordinates = {
			lat: 0,
			lng: 0
		}
		try{
			if(typeof localStorage !== "undefined"){
				const locationStr = localStorage.getItem(this._localstorage_key);
				if(locationStr !== null){
					coordinates = JSON.parse(locationStr);
				}
			}
		} catch(e){
			console.error(`Unable to get the user's last location: `, e);
		}
		return coordinates;
	}

	cacheUserLastKnownLocation(location : Coords){
		//need to store a string in LS 10.31.22 KL
		localStorage.setItem(this._localstorage_key, JSON.stringify(location));
	}
}

export {searchForParks, searchForBathrooms, searchForIceCream, searchForRestaurants, UserLocation};