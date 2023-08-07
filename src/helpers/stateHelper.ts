import { Dispatch, SetStateAction } from 'react';

export const updateStateObject = <S, T>(key: keyof S, value: T, action: Dispatch<SetStateAction<S>>) => {
    action((prevState) => {
        if (Array.isArray(prevState[key])) {
            let tempArray = prevState[key] as T[];
            if (tempArray.includes(value)) {
                tempArray = tempArray.filter((x) => x !== value);
            } else {
                tempArray.push(value);
            }
            return {
                ...prevState,
                [key]: tempArray,
            };
        } else {
            return {
                ...prevState,
                [key]: value,
            };
        }
    });
};
