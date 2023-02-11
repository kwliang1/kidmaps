import {PlaceSearchResult} from "../index";

export interface BathroomSearchResult extends PlaceSearchResult {
    public: boolean;
    paid: boolean;
}


export class Bathroom implements BathroomSearchResult {
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
