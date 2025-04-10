import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
import { coursePart } from "./types";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts:coursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];


  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}></Total>
    </div>
  );
};

export default App;