import React from 'react';
import './RecordList.css'
import RecordListItem from './RecordListItem';
import RecordSection from './RecordSection';

const monthsString = ["January","February","March","April","May","June","July",
"August","September","October","November","December" ];

const getSortedRecordSections = (sortedRecords, onRemovePressed) => {
    
    return (
        <div className="recordlist_container">
            {
                sortedRecords.map(records => 
                    <RecordSection
                        key={records.key}
                        title={records.key}
                        records={records.records}
                        onRemovePressed={onRemovePressed}
                    />)
            }
        </div>
    )
};

const getFilteredRecordItems = (filteredRecords, onRemovePressed) => {
    return (
        <div>
            {filteredRecords.map(record => 
                <RecordListItem 
                key={record._id} 
                record={record} 
                onRemovePressed={onRemovePressed}
            />)}
        </div>
    )
}

const RecordList = ({
    records, onSorting, sortby, filteringby, categories, storeNames, months, onRemovePressed
}) => {

    let content = '';
    
    if (onSorting) {
        switch(sortby){
            case 'CATEGORY':
                let recordsByCategory =[];
                categories.forEach(category => {recordsByCategory.push({key: category, records: []})});
                records.forEach(record => {
                    recordsByCategory[categories.indexOf(record.category)].records.push(record);
                })
                content = getSortedRecordSections(recordsByCategory, onRemovePressed);
                break;

            case 'STORE_NAME':
                let recordsByStoreName =[];
                storeNames.forEach(store => {recordsByStoreName.push({key: store, records: []})});
                records.forEach(record => {
                    recordsByStoreName[storeNames.indexOf(record.storeName)].records.push(record);
                })
                content = getSortedRecordSections(recordsByStoreName, onRemovePressed);
                break;
            
            case 'MONTH':
            default:
                let recordsByMonth =[];
                months.forEach(month => {recordsByMonth.push({key: monthsString[month], records: []})});
                records.forEach(record => {
                    recordsByMonth[months.indexOf(record.date.getMonth())].records.push(record);
                })
                content = getSortedRecordSections(recordsByMonth, onRemovePressed);
                break;
        }
    } else {
        switch (filteringby.option) {
            case 'category': 
                let recordsByCategory = records.filter(record => record.category === filteringby.keyword1);
                content = getFilteredRecordItems(recordsByCategory, onRemovePressed);
                break;

            case 'storeName':
                let recordsByStoreName = records.filter(record => record.storeName === filteringby.keyword1);
                content = getFilteredRecordItems(recordsByStoreName, onRemovePressed);
                break;
            case 'date':
                let recordsByDate1 = records.filter(record => new Date(record.date) >= new Date(filteringby.keyword1));
                let recordsByDate2 =recordsByDate1.filter(record => new Date(record.date) <= new Date(filteringby.keyword2));
                content = getFilteredRecordItems(recordsByDate2, onRemovePressed);
                break;

            case 'total':
                let recordsByTotal1 = records.filter(record => record.total >= filteringby.keyword1);
                let recordsByTotal2 = recordsByTotal1.filter(record => record.total <= filteringby.keyword2);
                content = getFilteredRecordItems(recordsByTotal2, onRemovePressed);

                
        }
    }

    return content;
};

export default RecordList;
