const { v4: uuid } = require('uuid');
const express = require('express')
const bodyParser = require('body-parser');
const connectMongoDB = require('./config/db.js')
const cors = require('cors');
const Expense = require('./model/expense.model')


var fakeRecords = [{
    id: 'ae06181d-92c2-4fed-a29d-fb53a6301eb9',
    text: 'Weekly Grocery Shopping',
    category: 'Grocery',
    date: new Date(2022, 1, 1),
    storeName: 'Walmart',
    total: 200,
    details: 'chicken bananas'
},{
    id: 'cda9165d-c263-4ef6-af12-3f1271af5fb4',
    text: 'Formal Dressing for Interviews',
    category: 'Clothing',
    date: new Date(2022, 2, 2),
    storeName: 'Suits',
    total: 1000,
    details: 'jacket tie high-heels'
},{
    id: '2e538cc5-b734-4771-a109-dfcd204bb38b',
    text: 'Road Trip to Montreal',
    category: 'Traveling',
    date: new Date(2022, 2, 3),
    storeName: 'Montreal',
    total: 800,
    details: 'hotel car-renting'
},{
    id: '83fc6c70-023e-11ed-b939-0242ac120002',
    text: 'the Weeknd Concert',
    category: 'Entertainment',
    date: new Date(2022, 2, 24),
    storeName: 'TD Place',
    total: 500,
    details: 'ticket'
},{
    id: '904afde8-023e-11ed-b939-0242ac120002',
    text: 'Feb renting',
    category: 'Housing',
    date: new Date(2022, 2, 15),
    storeName: 'Landload',
    total: 700,
    details: 'Monthly renting'
}];

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectMongoDB().then(()=> {
    console.log('Connected to MongoDB')
})


app.get('/records', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
    
})

app.post('/records', async (req, res) => {
    let { record } = req.body;
    record = {...record, date: record.date == null ? undefined : record.date}
    try {
        const expense = new Expense(record);
        await expense.save();
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }

    // if (record) {
    //     const insertedRecord = {
    //         id: uuid(),
    //         text: record.text,
    //         category: record.category,
    //         date: record.date,
    //         storeName: record.storeName,
    //         total: record.total,
    //         details: record.details
    //     }
    //     fakeRecords.push(insertedRecord);
        
    // } else{
        
    // }
});

app.delete('/records/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const removedrecord =  await Expense.findOne({_id: id});
        await Expense.remove({_id: id});
        console.log(removedrecord);
        res.status(200).json(removedrecord);
    } catch (error) {
        res.status(500).json({ message: 'Server Error'});
    }
    
    // if ( id ) {
    //     const removedrecord = fakeRecords.find(record => record.id === id);
    //     fakeRecords = fakeRecords.filter(record => record.id !== id);
    //     res.status(200).json(removedrecord);
    // } else{
        
    // }

})

const PORT = process.env.PORT || 5002;

app.listen(PORT, ()=> console.log(`Server runs on PORT ${PORT}`));