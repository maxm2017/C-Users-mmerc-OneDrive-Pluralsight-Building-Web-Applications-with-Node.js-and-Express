const express = require('express');
const debug = require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb');
const sessions = require('../data/sessions.json');

const adminRouter = express.Router();

adminRouter.route('/').get((req, res)=>{
    const url = 
        "mongodb+srv://MaxM2022:testpass@globomantics.st46ft5.mongodb.net/?retryWrites=true&w=majority";
    const dbName = 'globomantics';
    

    (async function mongo(){
        let client;
        try{
            client = await MongoClient.connect(url);
            console.log('connected to db');

            const db = client.db(dbName);

            const response = await db.collection('sessions').insertMany(sessions);
            res.json(response);

        }catch(error){
            console.log(error.stack);
        }
        client.close();
    })();
});

module.exports = adminRouter;