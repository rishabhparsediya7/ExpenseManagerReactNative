import { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type useAuthProps = string | string[];

const useDeepCompareMemoize = (value: any) => {
    const ref = useRef<any>();
    if (JSON.stringify(ref.current) !== JSON.stringify(value)) {
        ref.current = value;
    }
    return ref.current;
};

const useAuthStorage = (args: useAuthProps) => {
    const [values, setValues] = useState<Record<string, string | null>>({});
    const [loading, setLoading] = useState(true);

    const memoizedArgs = useDeepCompareMemoize(args);

    useEffect(() => {
        const keys = Array.isArray(memoizedArgs) ? memoizedArgs : [memoizedArgs];

        const fetchValues = async () => {
            try {
                const result: Record<string, string | null> = {};
                for (const key of keys) {
                    const value = await AsyncStorage.getItem(key);
                    result[key] = value;
                }
                setValues(result);
            } catch (error) {
                console.error("Error fetching values from AsyncStorage", error);
            } finally {
                setLoading(false);
            }
        };

        fetchValues();
    }, [memoizedArgs]);

    return { values, loading };
};


export default useAuthStorage;
