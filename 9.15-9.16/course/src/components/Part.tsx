import { CoursePart } from "../types"; //this is type

//this is props object
interface PartProps {
  coursePart : CoursePart;
};

const Part = (props:PartProps) => {
    console.log(props)//to silence
    switch(props.coursePart.kind){
        case 'basic':
            return (<p>{props.coursePart.name} {props.coursePart.description} {props.coursePart.exerciseCount}</p>);
        case 'group':
            return (<p>{props.coursePart.name} {props.coursePart.groupProjectCount} {props.coursePart.exerciseCount}</p>);
        case 'background':
            return (<p>{props.coursePart.name} {props.coursePart.description} {props.coursePart.exerciseCount} {props.coursePart.backgroundMaterial}</p>);
        default : 
            return (<></>);
    }

}

export default Part