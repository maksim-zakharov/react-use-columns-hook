import { useState } from 'react';

type Result<T> = [val: T, onChange: (val: T) => void];

const getStorageItemByKey = (key: string, defaultValue: any) => {
    const item = localStorage.getItem(key);
    if (item) {
        return JSON.parse(item);
    }

    return defaultValue || null;
};

const setStorageItemByKey = (key: string, value: any) => {
    if (!value) {
        localStorage.removeItem(key);
    } else {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

const useLocalStorage = <T,>(key: string, defaultValue?: T): Result<T> => {
    const [value, setValue] = useState<T>(getStorageItemByKey(key, defaultValue));

    const onChange = (val: T) => {
        setStorageItemByKey(key, val);
        setValue(val);
    };

    return [value, onChange];
};

export default useLocalStorage;
