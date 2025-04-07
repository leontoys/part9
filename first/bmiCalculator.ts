const calculateBmi = (height:number,weight:number):string => {

    if(isNaN(height) || isNaN(weight)){
        throw new Error("malformatted parameters")
    }

    const bmi:number = weight / ( ( height / 100 ) * ( height / 100 ))
    let result:string = ''
    console.log(bmi)
    if(bmi < 18.5){
        result = 'Under weight'
    }
    else if(bmi >= 18.5 && bmi <= 24.9 ){
        result = 'Normal range'
    }
    else if(bmi >= 25 && bmi <= 29.9){
        result = 'Over weight'
    }
    else{
        result = 'Obese'
    }

    return result

}

//console.log(calculateBmi(180,74))
if(require.main === module){
    try {
        if(!isNaN(Number(process.argv[2])) && !isNaN(Number(process.argv[3]))){
            const height:number = Number(process.argv[2])
            const weight:number = Number(process.argv[3])
            console.log(calculateBmi(height,weight))  
        }
        else{
            throw new Error('Provided values are not numbers!')
        }      
    } catch (error:unknown) {
        let errorMessage = 'Something bad happened'
        if(error instanceof Error){
            errorMessage += ' Error '+ error.message
        }
        console.log(errorMessage)
    }
}

export default calculateBmi
