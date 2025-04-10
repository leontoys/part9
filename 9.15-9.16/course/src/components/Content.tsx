import { CoursePart } from "../types"; //this is type
import Part from "./Part";

//this is props object
interface ContentProps {
  courseParts : CoursePart[];
};

const Content = (props:ContentProps) => {
  return (
    <>
    {props.courseParts.map((course)=>(
      <Part key={course.name} coursePart={course}></Part>
    ))}
    </>
  )
}

export default Content