interface analysis {
        periodLength: number,
        trainingDays: number,
        success: boolean,
        rating: number,
        ratingDescription: string,
        target: number,
        average: number
}


const calculateExercises = (dailyExerciseHours:number[],targetAmount:number):analysis => {
    const result:analysis = {
        periodLength: 0,
        trainingDays: 0,
        success: false,
        rating: 0,
        ratingDescription: '',
        target: 0,
        average: 0
    }

    result.periodLength = dailyExerciseHours.length
    result.target = targetAmount

    let sum:number = 0
    for(let i = 0; i < result.periodLength; i++){
        if(dailyExerciseHours[i]){
            result.trainingDays++ //count if not 0
            sum += dailyExerciseHours[i]
        }
    }
    result.average = sum / result.periodLength
    result.success = result.average >= targetAmount
    //rating
    if(result.average > targetAmount){
        result.rating = 1
        result.ratingDescription = 'exceeded expectation'
    }
    else if(result.average < targetAmount){
        result.rating = 3
        result.ratingDescription = 'expectation not met'
    }
    else{
        result.rating = 2
        result.ratingDescription = 'met expectation'
    }

    return result

}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2))