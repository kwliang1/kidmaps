import {useCallback, useEffect, useState} from "react";

type StorageKey = string;
export function useLocalStorage(key: StorageKey, defaultValue: string){
    let storageObj = typeof window !== "undefined" ? localStorage : {} as Storage;
    return useStorage(key, defaultValue, storageObj);
}
function useStorage (key: StorageKey, defaultValue: any, storageObject:Storage) {
    const [value, setValue] = useState(() => {
        if(typeof window !== "undefined"){
            const jsonValue = storageObject.getItem(key);
            if(jsonValue){
                return JSON.parse(jsonValue);
            } else {
                if(typeof defaultValue === "function"){//if default val is a function, return value of that func
                    return defaultValue();
                } else {
                    return defaultValue;
                }
            }
        } else {
            return defaultValue;
        }
    });

    useEffect(()=>{
        if(value === undefined){//if the value becomes undefined, remove value from storage
            storageObject.removeItem(key);
        } else {//else , keep value in LS up-to-date
            storageObject.setItem(key, JSON.stringify(value))
        }
    }, [value]);

    const remove = useCallback(() => {
        setValue(undefined);
    }, []);

    return [value, setValue, remove];
}