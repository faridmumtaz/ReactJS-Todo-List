import React, { useState } from 'react';
import './style.css';


function Button(props) {
    const { type, className, onClick, value, operationType } = props;
    let buttonStyle = 'btn my-2 py-2 ';
    if (operationType == 'primary') {
        buttonStyle += 'btn-primary'
    } else if (operationType == "secondary") {
        buttonStyle += 'btn-secondary'
    }

    return (
        <button type={type} className={buttonStyle + ' ' + className} onClick={onClick}>{value}</button>
    );
}

export default Button;