
export const getRecords = state => {
    return state.records.data.map((record) => {
        record.date = new Date(record.date);
        return record;
    })
};
export const getRecordsLoading = state => state.records.isLoading;

