import {useCallback, useEffect, useState} from "react";

export default function useAsync(promise:Function , dependencies:[] = []){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [value, setValue] = useState();

    const callbackMemoized = useCallback(()=>{
        //every time this is invoked, reset the local state
        setLoading(true)
        setError(undefined)
        setValue(undefined)
        promise()
            .then(setValue)
            .catch(setError)
            .finally(()=>{setLoading(false)})
    }, dependencies);

    useEffect(()=>{
        callbackMemoized();
    }, [callbackMemoized]);

    return {loading, error, value};
}