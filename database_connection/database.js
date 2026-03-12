import {MongoClient,ServerApiVersion} from "mongodb";
import 'dotenv/config'; 
const uri=process.env.ConnectionString;
const client=new MongoClient(uri,{
    serverApi:{
        version:ServerApiVersion.v1,
        strict:false,
        deprecationErrors:true,
    }
});
await client.connect();


export default client;