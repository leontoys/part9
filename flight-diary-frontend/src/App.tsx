import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "./types";
import { useEffect,useState } from "react";
import diaryService from "./services/diaries";
import axios from "axios";

const App = () => {

  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState<string>("");
  const [error,setError] = useState<string>("");


  useEffect(() => {

    const fetchDiariesList = async () => {
      const diaries = await diaryService.getAll();
      console.log("diaries",diaries)
      setDiaries(diaries);
    };
    void fetchDiariesList();
  }, []);

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("visiblity",visibility);
    const diaryEntry:NewDiaryEntry = {
      date,
      comment,
      visibility,
      weather,
    };
    try {
      const addedEntry:DiaryEntry  =  await diaryService.create(diaryEntry);
      setDiaries(diaries.concat(addedEntry));      
    } catch (error) {
      if(axios.isAxiosError(error)){
        setError(error.response?.data);
        setTimeout(()=>setError(""),5000);
      }
      else{
        console.error(error);
      }
    }

    setDate("");
    setVisibility(Visibility.Great);
    setWeather(Weather.Sunny);
    setComment("");
  };

  return (
    <div>
      <h1>Add new entry</h1>
      {error && <p style={{color:"red"}}>{error}</p>}
      <form onSubmit={addEntry}>
        <div>
          <label>date</label>
          <input type="date" value={date} onChange={({target})=>setDate(target.value)}></input>
        </div>
        <div>
          <label>visibility</label>         
          { Object.values(Visibility).map(v => (
            <span key={v}>
            <input type="radio" value={v} name="visibility" checked={visibility === v}
            onChange={({target})=>setVisibility(target.value as Visibility)}></input>
            <label>{v.toString()}</label>
            </span>
          ) )}
        </div>
        <div>
          <label>weather</label>
          { Object.values(Weather).map(v => (
            <span key={v}>
            <input type="radio" value={v} name="weather" checked={weather === v}
            onChange={({target})=>setWeather(target.value as Weather)}></input>
            <label>{v.toString()}</label>
            </span>
          ) )}     
        </div>
        <div>
          <label>comments</label>
          <input value={comment} onChange={({target})=>setComment(target.value)}></input>
        </div>
        <button type="submit">add</button>
      </form>
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