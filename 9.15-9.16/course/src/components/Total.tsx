import { courseParts, coursePart  } from "../types";

const Content = (props:courseParts) => {

    const totalExercises:number = props.courseParts.reduce((sum:number, part:coursePart) => sum + part.exerciseCount, 0);


    return (
        <p>
          Number of exercises {totalExercises}
        </p>
    )
}

export default Content