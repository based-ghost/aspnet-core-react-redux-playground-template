import { useState } from 'react';

/**
 * Name: useInputValue
 * Use: Takes in an initial value, sets it as the value for the value variable received from useState. 
 *      Returns an object containing the value and an onChange function to update that value.
 */
export const useInputValue = (initialValue: any) => {
    const [value, setValue] = useState(initialValue);
    return {
        value,
        onChange: (e) => {
            setValue(e.target.value || e.target.innerText);
        }
    };
};