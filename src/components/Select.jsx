import React from 'react';
import { forwardRef } from 'react';

function Select({
    options,
    label,
    className='',
    ...props
},ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {
                label && <label htmlFor={id} className={`${className}`}>
                    {label}
                </label>
            }
            <select ref={ref} id={id} {...props} className={`px-3 py-2 border border-gray-300 rounded-md  ${className}`}>
                {
                    options?.map((option)=>(
                        <option key={option} value={option}>{option}</option>
                    ))
                }
            </select>
        </div>
    );
}

export default forwardRef(Select);