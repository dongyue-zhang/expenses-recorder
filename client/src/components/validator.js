import { isEmpty, isDate, isDecimal, } from 'validator';
import React, { useState } from 'react';

const validator = (text, category, storeName, total, date) => {
    const [textError, setTextError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [dateError, setDateError] = useState('');
    const [storeNameError, setStoreNameError] = useState('');
    const [totalError, setTotalError] = useState('');
    const [isValidated, setIsValidated] = useState(false);

    if (isEmpty(text)) {
        setTextError('Title can not be empty');
    }
    
    if (isEmpty(category)) {
        setCategoryError('Please choose a category');
    }

    if (isEmpty(storeName)) {
        setStoreNameError('Pease enter a store name');
    }
    if (! isDecimal(total)) {
        setTotalError('Total must be a number');
    }

    if (! isDate(date) ) {
        setDateError("Please chose a date");
    }

    if (isEmpty(textError) && isEmpty(categoryError) && isEmpty(dateError) && isEmpty(storeNameError) && isEmpty(totalError)) {
        setIsValidated(true);
    }

    return {
        isValidated: isValidated,
        textError: textError,
        categoryError: categoryError,
        dateError: dateError,
        storeName: storeNameError,
        totalError: totalError
    };
}

export default validator;