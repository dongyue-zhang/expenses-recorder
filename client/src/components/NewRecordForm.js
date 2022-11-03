import React, {useState} from "react";
import './NewRecordForm.css'
import { getRecords } from "./selectors";
import { addRecordRequest } from './thunks';
import { connect } from 'react-redux';
import FieldError from "./FieldError";
import { Form, FormField } from 'react-hooks-form';

const NewRecordForm = ({records, onCreatePressed, setOnAdding}) => {

    function validate (formValues) {
        let errors = {};
    
        if (typeof formValues.text == 'undefined' ) {
            errors.text = 'Title can not be empty';
        } else {
            let isDuplicateText = records.some(record => record.text === formValues.text);
            if (isDuplicateText) {
                errors.text = 'The record exits. Please enter again!';
            }
        }
               
        if (typeof formValues.category == 'undefined') {
            errors.category = 'Please choose a category';
        }
    
        if (typeof formValues.storeName == 'undefined') {
            errors.storeName = 'Please enter a store name';
        }

        if (typeof formValues.total == 'undefined') {
            errors.total = 'Please enter a total amount';
        }

        if (typeof formValues.date == 'undefined') {
            errors.date = 'Please choose a date';
        }
        return {
            errors: errors
        };
    }

    const handleSubmit = (formValues) => {
            let newRecord = {
                text: formValues.text.trim(),
                category: formValues.category,
                date: new Date(formValues.date),
                storeName: formValues.storeName.trim(),
                total: formValues.total,
                details: formValues.details.trim(),
            };
            setOnAdding(false);
            
            return onCreatePressed(newRecord);
    }
    
    
    return (
    <Form onSubmit={handleSubmit} validate={validate} className='new_record_form'>
        <div className="form_field">
            <label htmlFor='text' className="required">Title</label>
            <FormField component='input' type="text" id="text" name='text' />
            <FieldError name={'text'} />
        </div>
        <div className="form_field">
            <div>
                <label htmlFor='category' className="required">Category</label>
                <FormField component='select' id='category' name='category' >
                    <option value={null}>Choose</option>
                    <option value='Grocery'>Grocery</option>
                    <option value='Clothing'>Clothing</option>
                    <option value='Traveling'>Traveling</option>
                    <option value='Housing'>Housing</option>
                    <option value='Entertainment'>Entertainment</option>
                </FormField>
            </div>
            <FieldError name='category' />
        </div>
        
        <div className="form_field">
            <div>
                <label htmlFor='date' className="required">Date</label>
                <FormField component='input' type='date' id='date' name='date' />
            </div>
            <FieldError name='date' />
        </div>
        
        <div className="form_field">
            <div>
                <label htmlFor='storeName' className="required">Store</label>
                <FormField component='input' id='storeName' type='text' name='storeName' />
            </div>
            <FieldError name='storeName' />
        </div>
        
        <div className="form_field">
            <div>
                <label htmlFor='total' className="required">Total</label>
                <FormField component='input' id='total' type='number' name='total'/>
            </div>
            <FieldError name='total' />
        </div>
        
        <div className="form_field">
            <label htmlFor='details'>Details</label>
            <FormField component='textarea' id='details' name='details' />
        </div>
        <div><button type='submit'>Submit</button></div>
    </Form> )
}

const mapStateToProps = state => ({
    records: getRecords(state),
});

const mapDispathToProps = dispath => ({
    onCreatePressed: record => dispath(addRecordRequest(record)),
});

export default connect(mapStateToProps, mapDispathToProps)(NewRecordForm);