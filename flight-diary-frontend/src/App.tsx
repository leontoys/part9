import { NonSensitiveDiaryEntry } from "./types";
import { useEffect,useState } from "react";
import diaryService from "./services/diaries";

const App = () => {

  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  console.log(diaries)

  useEffect(() => {

    const fetchDiariesList = async () => {
      const diaries = await diaryService.getAll();
      console.log("diaries",diaries)
      setDiaries(diaries);
    };
    void fetchDiariesList();
  }, []);

  return (
    <div>
      <h1>Diary Entries</h1>
      {diaries.map(diary => (
        <div key={diary.id}>
        <h2>{diary.date}</h2>
        <p>visibility : {diary.visibility}</p>
        <p>weather : {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;