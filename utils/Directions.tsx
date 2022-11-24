import {Coords} from "google-map-react";

class DirectionsUrl {
    tag: string;
    base: string;
    origin: string;
    destination: string;
    destination_place_id?: string;
    travelmode: string;

    constructor(origin:Coords, destination:google.maps.LatLng, place_id:string | undefined) {
        this.tag = `[DirectionsUrl]`;
        this.base = `https://www.google.com/maps/dir/?api=1`;
        this.origin = `${origin.lat},${origin.lng}`;
        this.destination = `${destination.lat()},${destination.lng()}`;
        if(place_id){
            this.destination_place_id = place_id;
        }
        this.travelmode = String(google.maps.TravelMode.WALKING).toLowerCase();//assume they're walking;
    }

    get href(){
        let url = new URL(this.base);
        url.searchParams.append('origin', this.origin);
        url.searchParams.append('destination', this.destination);
        if(this.destination_place_id){
            url.searchParams.append('destination_place_id', this.destination_place_id);
        }
        url.searchParams.append('travelmode', this.travelmode);
        console.info(`${this.tag} final url: ${url.href}`);
        return url.href;
    }
}

export default DirectionsUrl;