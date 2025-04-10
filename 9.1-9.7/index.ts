import express from 'express';
import calculateBmi from './bmiCalculator';
import { parseRequest,calculateExercises} from "./exerciseCalculator";
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
   
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const targetHours:string = _req.body?.target;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const daily_exercises:string[] = _req.body?.daily_exercises;
        const {target,dailyHours} = parseRequest(targetHours,daily_exercises);
        const result = calculateExercises(dailyHours,target);
        res.json(result);
    } 
    catch (error:unknown) {
        let errorMessage = 'Something bad happened';
        if(error instanceof Error){
            errorMessage += ' Error '+ error.message;
        }
        console.log(errorMessage);
        res.json({
            error : errorMessage
        });
    }

});

const PORT = 3003;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});