import React, { useState } from 'react';
import './Header.css';
import NewRecordForm from './NewRecordForm';
import FilteringForm from './FilteringForm';

const Header = ({ setOnSorting, setSortby, setFilteringby, categories, storeNames}) => {
    const [ onAdding, setOnAdding ] = useState(false);
    const [ onFiltering, setOnFiltering ] = useState(false);

    const sortbyOptions = [
        {
            value: 'MONTH',
            label: 'Month'
        },
        {
            value: 'CATEGORY',
            label: 'Category'
        },
        {
            value: 'STORE_NAME',
            label: 'Store'
        }
    ]
    
    const content = (
    <div className='header'>
        <div className="header_banner">
            <div className="header_logo">
                <h2>Expensers Recorder</h2>
            </div>
            <div className='header_buttons'>
                {onAdding || onFiltering ?
                <button onClick={() => {setOnAdding(false); setOnFiltering(false);}}>Close</button> :
                <div>
                    <button onClick={() => setOnAdding(true)}>Add</button>
                    <button onClick={() => setOnFiltering(true)}>Filter</button>
                    <select onChange={(e) => {setOnSorting(true);setSortby(e.target.value)}}>
                        <option value='' disabled={true}>Sort</option>
                    {sortbyOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                </div>}
            </div>
        </div>

        {onAdding ? <NewRecordForm setOnAdding={setOnAdding}/> : null}
        {onFiltering ? 
        <FilteringForm 
            setFilteringby={setFilteringby} 
            setOnSorting={setOnSorting}
            categories={categories}
            storeNames={storeNames}
        /> : null}
    </div>
    );

    return content;
};

export default Header;