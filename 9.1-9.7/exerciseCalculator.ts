interface analysis {
        periodLength: number,
        trainingDays: number,
        success: boolean,
        rating: number,
        ratingDescription: string,
        target: number,
        average: number
}

export interface exercise {
    target : number,
    dailyHours : number[] 
}

export const parseArguments = (args:string[]):exercise => {

    if(args.length < 4) throw new Error('Not enough arguments');

    if(isNaN(Number(args[2]))){
        throw new Error('Provided values are not numbers!');
    }    
    const target:number = Number(process.argv[2]);

    const daily:string[] = process.argv.slice(3);
    let dailyHours:number[] = [];
    for(let i = 0; i < daily.length; i++){
        if(isNaN(Number(daily[i]))){
            throw new Error('Provided values are not numbers!');
        }
        dailyHours = dailyHours.concat(Number(daily[i]));
    }

    return {
        target : target,
        dailyHours : dailyHours
    };
};

export const parseRequest = (targetHours:string,daily:string[]):exercise => {

    if(isNaN(Number(targetHours))){
         throw new Error('Provided values are not numbers!');
     }    
    const target:number = Number(targetHours);

    let dailyHours:number[] = [];
    for(let i = 0; i < daily.length; i++){
         if(isNaN(Number(daily[i]))){
             throw new Error('Provided values are not numbers!');
         }
         dailyHours = dailyHours.concat(Number(daily[i]));
     }

    return {
         target : target,
         dailyHours : dailyHours
     };
};

export const calculateExercises = (dailyExerciseHours:number[],targetAmount:number):analysis => {
    const result:analysis = {
        periodLength: 0,
        trainingDays: 0,
        success: false,
        rating: 0,
        ratingDescription: '',
        target: 0,
        average: 0
    };

    result.periodLength = dailyExerciseHours.length;
    result.target = targetAmount;

    let sum:number = 0;
    for(let i = 0; i < result.periodLength; i++){
        if(dailyExerciseHours[i]){
            result.trainingDays++; //count if not 0
            sum += dailyExerciseHours[i];
        }
    }
    result.average = sum / result.periodLength;
    result.success = result.average >= targetAmount;
    //rating
    if(result.average > targetAmount){
        result.rating = 1;
        result.ratingDescription = 'exceeded expectation';
    }
    else if(result.average < targetAmount){
        result.rating = 3;
        result.ratingDescription = 'expectation not met';
    }
    else{
        result.rating = 2;
        result.ratingDescription = 'met expectation';
    }

    return result;

};

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2))


try {

    const {target,dailyHours} = parseArguments(process.argv);
    console.log(calculateExercises(dailyHours,target));
     
} catch (error:unknown) {
    let errorMessage = 'Something bad happened';
    if(error instanceof Error){
        errorMessage += ' Error '+ error.message;
    }
    console.log(errorMessage);
}


//console.log(dailyHours)
