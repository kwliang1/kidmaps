import useAsync from "./useAsync";
import {useEffect, useState} from "react";

export default function useBrowserPermission(name: PermissionName){
    const {loading, error, value} = useAsync(async () => {
        return navigator.permissions.query({name})
    });
    const [permissionState, setPermissionState] = useState<PermissionState>("prompt");

    useEffect(() => {
        console.info(`value updated!`, value);
        if(value){
            const{state} = value;
            setPermissionState(state);
        }
    }, [value]);
    return {state:permissionState, value, setPermissionState}
}