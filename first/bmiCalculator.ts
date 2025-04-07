const calculateBmi = (height:number,weight:number):String => {

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

const height:number = Number(process.argv[2])
const weight:number = Number(process.argv[3])
console.log(calculateBmi(height,weight))