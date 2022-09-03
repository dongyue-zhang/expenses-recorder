import React from 'react';
import './RecordListItem.css'
import { FaTimes } from "react-icons/fa";

const RecordListItem = ({record, onRemovePressed}) => {
    // console.log(showItems);
    const content = 
        <div className='recordlistItem'>
            <div className="item_detail">
                <div className='item_title'>
                    <h3>{record.text}</h3>
                    <div className='item_store_date'>
                        
                        <p>{record.storeName} {record.category}</p>
                        
                        <p>{record.date.toString().split(record.date.getFullYear())[0]}</p>
                    </div>
                </div>
                <div className='item_total'>
                    <h4>{new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(record.total)}</h4>
                </div>
            </div>
            <FaTimes
          style={{ color: "red", cursor: "pointer", backgroundColor: "transparent", position: "relative", top: "0.5rem", right: "0.5rem"}}
          onClick={() => onRemovePressed(record._id)}
        />
        </div>
    ;
    
    return content;
};

export default RecordListItem;