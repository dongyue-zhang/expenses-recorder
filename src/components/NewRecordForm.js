import React, { useState } from "react";
import './NewRecordForm.css'
import { getRecords } from "./selectors";
import { addRecordRequest } from './thunks';
import { connect } from 'react-redux';

const NewRecordForm = ({records, onCreatePressed}) => {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [storeName, setStoreName] = useState('');
    const [total, setTotal] = useState('');
    const [details, setDetails] = useState('');

    const onSubmit = (event) => {
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
    }
    return (
    <form className="new_record_form">
        <div>
            <label htmlFor='text'>Title</label>
            <input type="text" id="text" name='text' value={text} 
            onChange = {e => setText(e.target.value)}
            ></input>
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
        <div>
            <label htmlFor='date'>Date</label>
            <input type='date' id='date' name='date' value={date} 
            onChange = {e => setDate(e.target.value)}></input>
        </div>
        <div>
            <label htmlFor='storeName'>Store</label>
            <input id='storeName' type='text' name='storeName' value={storeName} onChange = {e => setStoreName(e.target.value)}></input>
        </div>
        <div>
            <label htmlFor='total'>Total</label>
            <input id='total' name='total' type='number' value={total}
            onChange = {e => setTotal(e.target.value)}></input>
        </div>
        <div>
            <label htmlFor='details'>Details</label>
            <textarea id='details' name='details' value={details}
            onChange = {e => setDetails(e.target.value)}></textarea>
        </div>
        <div><button type='submit' onClick={onSubmit}>Submit</button></div>
    </form> )
}

const mapStateToProps = state => ({
    records: getRecords(state),
});

const mapDispathToProps = dispath => ({
    onCreatePressed: record => dispath(addRecordRequest(record)),
});

export default connect(mapStateToProps, mapDispathToProps)(NewRecordForm);