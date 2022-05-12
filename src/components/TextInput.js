import React, { useCallback, useContext, useEffect } from 'react';
import { joinClassNames } from "../utils/classNames";
import { FormContext } from './Form';

export default function TextInput(props) {
    const context = useContext(FormContext);

    const emitIsValid = useCallback(() => {
        context.onValidate({
            field: props.name,
            isValid: true,
            messages: []
        });
    }, [context.onValidate, props.name]);

    const validate = useCallback((value) => {
        if (!props.validation || props.validation.length === 0) {
            emitIsValid();
            return;
        }

        let messages = [];

        for (const v of props.validation) {
            messages = [
                ...messages,
                ...v(value)
            ];
        }

        if (messages.length === 0) {
            emitIsValid();
            return;
        }

        context.onValidate({
            field: props.name,
            isValid: false,
            messages
        });
    }, [context.onValidate, emitIsValid, props.validation, props.name]);

    const handleOnChange = (e) => {
        if (props.onChange) {
            props.onChange(e);
        }
    };

    useEffect(() => {
        validate(props.value);
    }, [context.submitted, validate, emitIsValid, props.value]);

    return (
        <div className="input-wrapper">
            <input type={props.type || 'text'}
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={handleOnChange}
                placeholder={props.placeholder}
                className={joinClassNames('text-input', props.className)} />
            {context.submitted && context.validation[props.name] && context.validation[props.name].messages.length > 0 && (
                <div className="error-container">
                    {context.validation[props.name].messages.map((m, i) => {
                        return <div key={i} className="error">{m}</div>;
                    })}
                </div>
            )}
        </div>
    );
}
