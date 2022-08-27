export const CREATE_RECORD = 'CREATE_RECORD';
export const createRecord = record => ({
    type: CREATE_RECORD,
    payload: { record },
});

export const REMOVE_RECORD = 'REMOVE_RECORD';
export const removeRecord = record => ({
    type: REMOVE_RECORD,
    payload: { record },
});

export const SHOW_DETAILS = 'SHOW_DETAILS';
export const showDetails = record => ({
    type: SHOW_DETAILS,
    payload: { record },
});

export const LOAD_RECORDS_IN_PROGRESS = 'LOAD_RECORDS_IN_PROGRESS';
export const loadRecordsInProgress = () => ({
    type: 'LOAD_RECORDS_IN_PROGRESS',
});

export const LOAD_RECORDS_SUCCESS = 'LOAD_RECORDS_SUCCESS';
export const loadRecordsSuccess = records => ({
    type: 'LOAD_RECORDS_SUCCESS',
    payload: { records }
});

export const LOAD_RECORDS_FAILURE = 'LOAD_RECORDS_FAILURE';
export const loadRecordsFailure = () => ({
    type: 'LOAD_RECORDS_FAILURE',
});

export const SHOW_ITEMS = 'SHOW_ITEMS';
export const showItems = ( {records, showItems }) => ({
    type: 'SHOW_ITEMS',
    payload: {records, showItems }
})