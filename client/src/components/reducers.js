import {
    CREATE_RECORD,
    REMOVE_RECORD,
    SHOW_DETAILS,
    LOAD_RECORDS_IN_PROGRESS,
    LOAD_RECORDS_SUCCESS,
    LOAD_RECORDS_FAILURE,
    SHOW_ITEMS
} from "./actions";

const inistialState = { isLoading: false, data: []};

export const records = ( state = inistialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case CREATE_RECORD: {
            const { record } = payload;
            return {
                ...state,
                data: state.data.concat(record)
            };
        }

        case REMOVE_RECORD: {
            const { record: recordToRemoved } = payload;
            return {
                ...state,
                data: state.data.filter(record => record._id !== recordToRemoved._id )
            };
        }

        case SHOW_DETAILS: {
            const { record: recordToShowed } = payload;
            return {
                ...state,
                data: state.data.map(record => {
                    if (record._id === recordToShowed._id) {
                        return recordToShowed;
                    }
                    return record;
                })
            }
        }

        case LOAD_RECORDS_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };

        case LOAD_RECORDS_SUCCESS:{
            const { records } = payload;
            return {
                ...state,
                isLoading: false,
                data: records,
            };
        }
        
        case LOAD_RECORDS_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        
        default: 
            return state;
    }
}