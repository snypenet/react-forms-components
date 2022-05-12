import React, { useCallback, useEffect, useMemo, useState } from 'react';

const FormContext = React.createContext({
    onValidate: null,
    submitted: false,
    validation: null
});

export { FormContext };

export default function Form(props) {
    const [validation, setValidation] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const isFormValid = useMemo(() => {
        for (const n in validation) {
            if (!validation[n].isValid) {
                return false;
            }
        }

        return true;
    }, [validation])

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (props.onSubmit) {
            props.onSubmit({
                isValid: isFormValid
            });
        }

        if (isFormValid) {
            setSubmitted(false);
        }
    };

    const handleOnValidate = useCallback((data) => {
        setValidation(v => {
            return {
                ...v,
                [data.field]: {
                    isValid: data.isValid,
                    messages: [
                        ...data.messages
                    ]
                }
            };
        });
    }, []);

    useEffect(() => {
        console.log(validation);
    }, [validation]);

    return (<form id={props.id} onSubmit={handleOnSubmit}>
        <FormContext.Provider value={{ onValidate: handleOnValidate, validation, submitted }}>
            {props.children}
        </FormContext.Provider>
        <button type="submit">Submit me</button>
    </form>);
}