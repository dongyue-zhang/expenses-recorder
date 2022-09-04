import {
    createRecord,
    removeRecord,
    showDetails,
    loadRecordsInProgress,
    loadRecordsSuccess,
    loadRecordsFailure
} from './actions';

const url = process.env.herokuurl + ':' + process.env.PORT;
// const url = process.env.localurl + ':' + process.env.PORT
// const url = 'http://localhost:5001';
// const url = 'https://expenses-recorder.herokuapp.com:' + process.env.PORT;

export const loadRecords = () => async (dispatch, getState) => {
    try{
        dispatch(loadRecordsInProgress());
        const response = await fetch(url + '/records');
        const records = await response.json();
        // console.log(records);
        dispatch(loadRecordsSuccess(records));
    } catch (e) {
        dispatch(loadRecordsFailure());
        dispatch(displayAlert(e));
    }
};

export const addRecordRequest = record => async dispath => {
    try{
        const body = JSON.stringify( {record} );

        //req
        const response = await fetch(url + '/records', {
            headers: {
                'Content-Type': 'application/json',
            }, 
            method: 'post',
            body, 
        });

        const addedrecord = await response.json();
        dispath(createRecord(addedrecord));

    } catch (e) {
        dispath(displayAlert(e));
    }
};

export const removeRecordRequest = id => async dispath => {
    try {
        const response = await fetch(url + `/records/${id}`, {
            method: 'delete',
        });
        const removedRecord = await response.json();
        dispath(removeRecord(removedRecord));
    } catch (e) {
        dispath(displayAlert(e));
    }
};

export const displayAlert = text => () => {
    alert(text);
};