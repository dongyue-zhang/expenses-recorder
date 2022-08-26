import React from "react";
import { connect } from "react-redux";
import { getRecords } from './selectors';
import RecordListItem from "./RecordListItem";
import { removeRecordRequest } from "./thunks";

const FiltedItems = ({ filteringby, records,  onRemovePressed, setFilteringby }) => {
    const filterRecords = ( option, keyword ) => {
        let recordsFound = records.filter(record => record[option] === keyword);
        return (
            <div>
                {recordsFound.map(record => <RecordListItem record={record} onRemovePressed={onRemovePressed}/>)}
            </div>
        )
    }
    let content ='';

    switch (filteringby.option) {
        case 'category': 
            let recordsFound = records.filter(record => record.category === filteringby.keyword1);
            content = (
                <div>
                    {recordsFound.map(record => <RecordListItem record={record} onRemovePressed={onRemovePressed}/>)}
                </div>
            )
            break;
            
        case 'storeName':
            content = filterRecords(filteringby.option, filteringby.keyword1);
            break;
        case 'date':
            
    }
    
    return content;  
}

const mapStateToProps = state => ({
    records: getRecords(state)
});

const mapDispathToProps = dispath => ({
    onRemovePressed: id => dispath(removeRecordRequest(id)),
});

export default connect(mapStateToProps, mapDispathToProps)(FiltedItems);