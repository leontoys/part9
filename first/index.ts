import express from 'express'
import calculateBmi from './bmiCalculator'
const app = express()

app.get('/hello',(_req,res)=>{
    res.send('Hello Full Stack!')
})

app.get('/bmi',(_req,res)=>{
    console.log(_req.query)
    const {height,weight} = _req.query
    console.log(height,weight)
    try {
        const bmi:string = calculateBmi(Number(height),Number(weight))
        res.json({
            weight : weight,
            height : height,
            bmi : bmi
        })        
    } catch (error) {
        console.log(error.message)
        res.json({
            error : error.message
        })
    }

})

const PORT = 3003

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})