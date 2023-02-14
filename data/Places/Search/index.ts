/* global google*/

import { Coords } from "google-map-react";
import {PlaceSearchResult} from "../Results";
import {BathroomSearchResult} from "../Results/Bathrooms";

export interface SearchRequestOptions {
	id: string;
	keyword: string;
	type: string;
	rankBy?: google.maps.places.RankBy;
	bounds?: google.maps.LatLngBounds;
	location?: Coords | google.maps.LatLng;
	radius?: number;
}
export class PlacesSearch {
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

	byKeyword(requirements: SearchRequestOptions):Promise<PlaceSearchResult[] | BathroomSearchResult[] | null> {
		const loggingTag = `${this.tag}[${requirements.keyword}]`;
		return new Promise<PlaceSearchResult[] | BathroomSearchResult[] | null>((resolve, reject) => {
			this.pending = true;
			try {
				const service = new google.maps.places.PlacesService(this.map),
					options = {
						openNow: true,
						rankBy: google.maps.places.RankBy.PROMINENCE,
						...requirements,
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
