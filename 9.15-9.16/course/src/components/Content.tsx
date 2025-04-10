import { courseParts  } from "../types";

const Content = (props:courseParts) => {

  return (
     props.courseParts.map(course => (      
     <p id={course.name}>
        {course.name} {course.exerciseCount}        
      </p>))
  )
}

export default Content