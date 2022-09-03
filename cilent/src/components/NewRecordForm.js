import React, { useState } from "react";
import './NewRecordForm.css'
import { getRecords } from "./selectors";
import { addRecordRequest } from './thunks';
import { connect } from 'react-redux';
import { isEmpty, isDate, isDecimal, } from 'validator';
// import { validator } from "./validator";


const NewRecordForm = ({records, onCreatePressed}) => {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [storeName, setStoreName] = useState('');
    const [total, setTotal] = useState('');
    const [details, setDetails] = useState('');
    const [textError, setTextError] = useState('');
        const [categoryError, setCategoryError] = useState('');
        const [dateError, setDateError] = useState('');
        const [storeNameError, setStoreNameError] = useState('');
        const [totalError, setTotalError] = useState('');
        const [isValidated, setIsValidated] = useState(false);


    const onSubmit = () => {
        

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


        console.log(isEmpty(text));
        console.log(textError);
        console.log(isEmpty(category));
        console.log(isEmpty(categoryError));
        console.log(isEmpty(date));
        console.log(isEmpty(dateError));
        console.log(isEmpty(storeName));
        console.log(isEmpty(storeNameError));
        console.log(isEmpty(total));
        console.log(isEmpty(totalError));
        // console.log(isEmpty(textError) && isEmpty(categoryError) && isEmpty(dateError) && isEmpty(storeNameError) && isEmpty(totalError));
        console.log(isValidated);

        // const { isValidated, textError, categoryError, dateError, storeNameError, totalError} = 
        // console.log(validator(text, category, date, storeName, total));

        if (isValidated) {
            const isDuplicateText = records.some(record => record.text === text);
            if (!isDuplicateText) {
                const newRecord = {
                    text: text,
                    category: category,
                    date: new Date(date),
                    storeName: storeName,
                    total: total,
                    details: details,
                };
                
                onCreatePressed(newRecord);
                setText('');
                setCategory('');
                setDate('');
                setTotal('');
                setDetails('');
            } else {
                alert('The record exits. Please enter again!')
            }
        } else {

        }

    }
    return (
    <div className="new_record_form">
        <div>
            <label htmlFor='text'>Title</label>
            <input type="text" id="text" name='text' 
            onChange = {e => setText(e.target.value)}
            ></input>
            {/* <div>{textError}</div> */}
        </div>
        <div>
            <label htmlFor='category'>Category</label>
            <select id='category' name='category' value={category} onChange = {e => setCategory(e.target.value)}>
                <option value='' disabled>Please choose</option>
                <option value='Grocery'>Grocery</option>
                <option value='Clothing'>Clothing</option>
                <option value='Traveling'>Traveling</option>
                <option value='Housing'>Housing</option>
                <option value='Entertainment'>Entertainment</option>
            </select>
        </div>
        {/* <div>{categoryError}</div> */}
        <div>
            <label htmlFor='date'>Date</label>
            <input type='date' id='date' value={date} 
            onChange = {e => setDate(e.target.value)}></input>
        </div>
        {/* <div>{dateError}</div> */}
        <div>
            <label htmlFor='storeName'>Store</label>
            <input id='storeName' type='text' value={storeName} onChange = {e => setStoreName(e.target.value)}></input>
        </div>
        {/* <div>{storeNameError}</div> */}
        <div>
            <label htmlFor='total'>Total</label>
            <input id='total' type='number' value={total}
            onChange = {e => setTotal(e.target.value)}></input>
        </div>
        {/* <div>{totalError}</div> */}
        <div>
            <label htmlFor='details'>Details</label>
            <textarea id='details' value={details}
            onChange = {e => setDetails(e.target.value)}></textarea>
        </div>
        <div><button type='submit' onClick={onSubmit}>Submit</button></div>
    </div> )
}

const mapStateToProps = state => ({
    records: getRecords(state),
});

const mapDispathToProps = dispath => ({
    onCreatePressed: record => dispath(addRecordRequest(record)),
});

export default connect(mapStateToProps, mapDispathToProps)(NewRecordForm);