import React, { useState } from 'react';

export default function Select({label, checked, disabled, onChange}) {
    return(
        <span className="select">
            {label && <label>{label}</label>}
            <input type='checkbox' checked={checked} onChange={onChange} disabled={disabled}/>
        </span>
    )
}