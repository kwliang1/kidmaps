export class UserLocationPermission {

    state: PermissionState;
    _name: PermissionName;
    constructor() {
        this._name = "geolocation";
        this.state = "denied";//default to denied.
    }

    get status():Promise<PermissionState>{
        return new Promise((resolve, reject) => {
            if(navigator.permissions){
                navigator.permissions.query({name: this._name})
                    .then(({state}) => {
                        this.state = state;
                        resolve(state);
                    })
                    .catch(err => {
                        reject(err);
                    })
            } else {
                reject(new Error('Navigator Permission not supported'))
            }
        })
    }
}