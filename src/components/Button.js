import React from 'react';

export default function Button(props) {
    const handleOnClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    }

    return (<button type={props.type || 'button'} title={props.title} id={props.id} onClick={handleOnClick}>
        {props.children}
    </button>)
} 