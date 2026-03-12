import express from 'express';
import client from '../database_connection/database.js';
const myDb=client.db("todos");
const collection=myDb.collection("todo_details");
const router=express.Router();

//URL POST http://localhost:8000/api/posts/
router.post('/',async(req,res)=>{
    try{
        console.log('Inserting');
        const result=await collection.insertOne(req.body);
        res.status(201).json(result);
        res.end();
    }
    catch(e){
        res.status(500).send(e.message);
        res.end();
    }
 
});

//URL GET http://localhost:8000/api/posts/
router.get('/',async(req,res)=>{
    try{
        console.log('Fetching');
        const result=await collection.find().toArray();
        res.status(201).json(result);
        res.end();
    }
    catch(e){
        res.status(500).send(e.message);
        res.end();
    }
});

//URL DELETE http://localhost:8000/api/posts/${data}
router.delete('/:list',async(req,res)=>{
    try{
        console.log("Deleting");
        let list=req.params.list  ;
        console.log(list);
        const result=await collection.deleteOne({"title":list});
        res.json(result);
        if(result.deletedCount===1){
            console.log('Deleted Successfully');
        }
        else {
            res.status(404).json({ message: "Item not found" });
        }
        res.status(201);
        res.end();    
    }
    catch(e){
        res.status(500).send(e.message);
        res.end();
    }
     
});

export default router;