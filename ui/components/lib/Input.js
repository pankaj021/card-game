import React from 'react';

export default function Input({value, label, type, placerholder, onChange}) {
    return (
        <span className='input'>
            {label && <label>{label}</label>}
            <input 
                type={type || "text"} 
                value={value}
                placeholder={placerholder|| "Enter your text..."}
                onChange={onChange}
            />
        </span>
    )
}