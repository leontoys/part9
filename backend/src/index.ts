import express from 'express';
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/ping',(_req,res)=>{
    console.log('I got a ping');
    res.send('pong');
});

app.use('/api/diagnoses',diagnosesRouter);

app.use('/api/patients',patientsRouter);

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/ping`);
});