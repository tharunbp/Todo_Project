import express from 'express';
import post from './routes/post.js';
import cors from 'cors';
import path from 'path';
import url from 'url';
const __fileName=url.fileURLToPath(import.meta.url);
const __dirName=path.dirname(__fileName);
const PORT=process.env.PORT;
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirName,'public')));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirName,'public','html_pages','main.html'));
});
app.use(express.urlencoded({extended:false}));
app.use('/api/posts',post);
app.listen(PORT,()=>console.log(`Server Running on port ${PORT}`));
console.log(`Running On http://localhost:${PORT}/`);