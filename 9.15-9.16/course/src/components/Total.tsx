import { CoursePart } from "../types"; //this is type

//this is props object
interface TotalProps {
  courseParts : CoursePart[];
};

const Total = (props:TotalProps) => {
     const totalExercises:number = props.courseParts.reduce((sum:number, part:CoursePart) => sum + part.exerciseCount, 0);

  return (
        <p>
           Number of exercises {totalExercises}
         </p>
  )
}

export default Total