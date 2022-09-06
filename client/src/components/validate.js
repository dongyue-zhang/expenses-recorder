import { isEmpty, isDate, isDecimal, } from 'validator';
import React, { useState } from 'react';

export const validator = (formValues) => {
    let errors = {};

    if (isEmpty(text)) {
        errors.text = 'Title can not be empty';
    }
    
    if (isEmpty(category)) {
        errors.category = 'Please choose a category';
    }

    if (isEmpty(storeName)) {
        errors.storeName = 'Pease enter a store name';
    }
    if (! isDecimal(total)) {
        errors.total = 'Total must be a number';
    }

    if (! isDate(date) ) {
        errors.date = "Please chose a date";
    }

    return {
        errors: errors
    };
}