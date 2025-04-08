import express from 'express';
import calculateBmi from './bmiCalculator';
const app = express();

//for reading request body correctly
app.use(express.json());

app.get('/hello',(_req,res)=>{
    res.send('Hello Full Stack!');
});

app.get('/bmi',(_req,res)=>{
    console.log(_req.query);
    const {height,weight} = _req.query;
    console.log(height,weight);
    try {
        const bmi:string = calculateBmi(Number(height),Number(weight));
        res.json({
            weight : weight,
            height : height,
            bmi : bmi
        });        
    } catch (error:unknown) {
        if(error instanceof Error){
            console.log(error.message);
            res.json({
                error : error.message
            });
        }
    }

});

app.post('/exercises',(_req,res)=>{
   console.log(_req.body);
   res.send('exercises'); 
});

const PORT = 3003;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});