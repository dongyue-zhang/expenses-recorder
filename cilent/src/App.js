import React, { useState, useEffect} from 'react';
import { hot } from 'react-hot-loader/root';
import RecordList from './components/RecordList';
import { connect } from 'react-redux';
import { AppContainer } from './StyledApp';
import './App.css'
import Header from './components/Header';
import { getRecords, getRecordsLoading } from './components/selectors';
import { removeRecordRequest, loadRecords } from './components/thunks';


const App = ( {records, isLoading, onRemovePressed, startLoadingRecords} ) => {
   useEffect(() => {startLoadingRecords();}, [])
   const loadingMessage = <div>Loading records...</div>

   const [ onSorting, setOnSorting ] = useState(true);
   const [ sortby, setSortby ] =useState('');
   const [ filteringby, setFilteringby ] = useState({});

   let categories = [];
   let storeNames = [];
   let months = [];

   records.forEach(record => {
      if (categories.indexOf(record.categore) === -1) {
         categories.push(record.category);
      }
      
      if (storeNames.indexOf(record.storeName) === -1) {
         storeNames.push(record.storeName);
      }
      if (months.indexOf(record.date.getMonth()) === -1) {
         months.push(record.date.getMonth());
      }
   });

   categories.sort();
   storeNames.sort();
   months.sort();

   let content = '';

   content = (
      <div className='app_container'>
         <Header 
            key='Header' 
            setOnSorting={setOnSorting} 
            setSortby={setSortby} 
            setFilteringby={setFilteringby}
            categories={categories}
            storeNames={storeNames}
         />
         <RecordList 
            records={records}
            sortby={sortby} 
            onSorting={onSorting} 
            filteringby={filteringby}
            categories={categories}
            storeNames={storeNames}
            months={months}
            onRemovePressed={onRemovePressed}
         />
      </div>
   )

   return isLoading ? loadingMessage : content;
};
const mapStateToProps = state => ({
   isLoading: getRecordsLoading(state),
   records: getRecords(state)
});

const mapDispatchToProps = dispath => ({
   startLoadingRecords: () => dispath(loadRecords()),
   onRemovePressed: id => dispath(removeRecordRequest(id))
});

export default hot(connect(mapStateToProps, mapDispatchToProps)(App));
