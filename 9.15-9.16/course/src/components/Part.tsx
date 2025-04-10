import { CoursePart } from "../types"; //this is type

//this is props object
interface PartProps {
  coursePart : CoursePart;
};

const Part = (props:PartProps) => {
    switch(props.coursePart.kind){
        case 'basic':
            return (
            <>
            <p><strong>{props.coursePart.name} {props.coursePart.exerciseCount}</strong></p>
            <p><em>{props.coursePart.description}</em></p>
            </>);
        case 'group':
            return (
                <>
                <p><strong>{props.coursePart.name} {props.coursePart.exerciseCount}</strong></p>
                <p><em>Group project count {props.coursePart.groupProjectCount}</em></p>
                </>);            
        case 'background':
            return (
                <>
                <p><strong>{props.coursePart.name} {props.coursePart.exerciseCount}</strong></p>
                <p><em>{props.coursePart.description} {props.coursePart.backgroundMaterial}</em></p>
                </>);  
        default : 
            return (<></>);
    }

}

export default Part