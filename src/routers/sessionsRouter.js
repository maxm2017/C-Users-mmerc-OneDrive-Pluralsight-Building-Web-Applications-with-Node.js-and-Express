const express = require('express');
const debug = require('debug')('app:sessionRouter');
const { MongoClient, ObjectId } = require('mongodb');
const sessions = require('../data/sessions.json');
const sessionsRouter = express.Router();

sessionsRouter.route('/')
    .get((req,res)=>{
        const url = 'mongodb+srv://MaxM2022:Iu6J0mYsnblIHg6g@globomantics.onjwqjm.mongodb.net/?retryWrites=true&w=majority';
        const dbName = 'globomantics';
        
    
        (async function mongo(){
            let client;
            try{
                client = await MongoClient.connect(url);
                debug('connected to db');
    
                const db = client.db(dbName);
    
                const sessions = await db.collection('sessions').find.toArray();

                res.render('sessions', {sessions});
            }catch(error){
                debug(error.stack);
            }
            client.close();
        })();
    });

sessionsRouter.route('/:id')
    .get((req,res) => {
        const url = 'mongodb+srv://MaxM2022:Iu6J0mYsnblIHg6g@globomantics.onjwqjm.mongodb.net/?retryWrites=true&w=majority';
        const dbName = 'globomantics';
        
    
        (async function mongo(){
            let client;
            try{
                client = await MongoClient.connect(url);
                debug('connected to db');
    
                const db = client.db(dbName);
    
                const session = await db.collection('sessions').findOne({_id: new ObjectID(id)});

                res.render('sessions', { sessions });
            }catch(error){
                debug(error.stack);
            }
            client.close();
        })();
    });
    
    module.exports = sessionsRouter;
    