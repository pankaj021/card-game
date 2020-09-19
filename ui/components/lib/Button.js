import React from 'react';

export default function Button({label, disabled, onClick}) {
    const className = disabled ? "button disabled" : "button"
    return(
        <div disabled={disabled} className={className} onClick={onClick}>
            {label}
        </div>
    )
}