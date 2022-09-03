import RecordListItem from "./RecordListItem";
import React from "react";
import './RecordSection.css';
import { useState } from "react";
import { BiRightArrow, BiDownArrow } from "react-icons/bi"

const RecordSection = ({ title, records, onRemovePressed}) => {
        const [showItems, setShowItems] = useState(false);
        const onDoubleClickItems = ()=>{
            setShowItems(!showItems);
        }
        let total = 0;
        records.map(record => {total = total + record.total;});

    return ( 
        <div className="recordsection_container">
            <div className="recordsection_summary">
                
                <div className="title">
                    <div className="icon" onClick={onDoubleClickItems}>
                        {showItems ? <BiDownArrow />
                        : <BiRightArrow />}
                    </div>
                {title}</div>
                <div className="total">{new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(total)}</div>
            </div>
            {showItems && records.map( record => 
                <RecordListItem 
                    key={record._id}
                    record={record} 
                    onRemovePressed={onRemovePressed}/> )}
        </div>
    )
};

export default RecordSection;