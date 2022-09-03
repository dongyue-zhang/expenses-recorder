import React, { createElement, useState } from 'react';
import './FilteringForm.css';
// import { categories, storeNames } from './selectors';

const FilteringForm = ({ setFilteringby, setOnSorting, categories, storeNames }) => {
    // const [sortbyOption, setSortbyOption ] = useState('');
    // const [ keyword, setKeyword ] = useState('');

    const [ storeName, setStoreName ] = useState('');

    const [filterBy, setFilterby] = useState({
        option:'',
        keyword1:'',
        keyword2:''
    })

    const onFilterByCategory = (e) => {
        setOnSorting(false);
        setFilteringby({option: 'category' , keyword1: e.target.value});
    }

    const onFilterByStoreName = (e) => {
        setOnSorting(false); 
        setFilteringby({option: 'storeName' , keyword1: storeName})
    }

    const onFilterByDateTotal = () => {
        if (filterBy.option !== '' && filterBy.keyword1 !== '' && filterBy.keyword2 !== '') {
            setOnSorting(false);
            setFilteringby(filterBy);
        } else {
            alert("Please enter dates/totals!");
        }
        
    
    }

    return (
        <div className='filtering_form'>
            <div className='filtering_form_categories'>
                <p>Category:</p>
                <div className='filtering_form_categories_buttons'>
                    {categories.map(category => <button key={category} value={category} onClick={onFilterByCategory}>{category}</button>)}
                </div>
            </div>
            <div className='filtering_form_storeName'>
                <p>Store Name:</p>
                
                    <select onChange={(e) => setStoreName(e.target.value)}>
                        <option disabled defaultValue={''}>Please choose...</option>
                        {storeNames.map(store => <option key= {store} value={store}>{store}</option>)}
                    </select>
                    <div><button onClick={onFilterByStoreName}>Submit</button></div>
                
            </div>
            <div className='filtering_form_date'>
                <p>Date:</p>
                
                    <label>From</label>
                    <input type='date' onChange={(e) => setFilterby({...filterBy, option:'date', keyword1: e.target.value})}></input>
                    <label>To</label>
                    <input type='date' onChange={(e) => setFilterby({...filterBy, option:'date', keyword2: e.target.value})}></input>
            
                <div><button onClick={onFilterByDateTotal}>Submit</button></div>
            </div>
            <div className='filtering_form_total'>
                <p>Total:</p>
                <label>From</label>
                <input type='number' min='0' onChange={(e) => setFilterby({...filterBy, option:'total', keyword1: e.target.value})}></input>
                <label>To</label>
                <input type='number' min='0' onChange={(e) => setFilterby({...filterBy, option:'total', keyword2: e.target.value})}></input>
                <div><button onClick={onFilterByDateTotal}>Submit</button></div>
            </div>
        </div>
    )
};

export default FilteringForm;