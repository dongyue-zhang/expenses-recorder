import React from "react";
import { useFormFieldMeta } from 'react-hooks-form';
import './FieldError.css';

const FieldError = ({ name }) => {
    const { error, invalid, visited } = useFormFieldMeta(name);

    if (visited && invalid) {
        return (
            <div className="field-error">
                {error}
            </div>
        )
    }

    return null;
}

export default FieldError;