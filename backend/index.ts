import express from 'express';
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping',(_req,res)=>{
    console.log('I got a ping');
    res.send('pong');
});

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/ping`);
});