import{ useEffect, useState} from 'react';
import{ useParams } from 'react-router-dom';

function LessonDetails() {
  const { lessonId } = useParams();
  //
  const [lessons, setLessons] = useState(null);


  useEffect(() => {
    fetch('http://localhost:8000/lessons')
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log('Fetched lessons:', data);
        setLessons(data);
      })
  }, []);

  const lesson = lessons?.find(lesson => lesson.id === lessonId);
  
  return (
    <>
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-200 to-cyan-400 dark:bg-cyan-950">
      <div className="flex-col place-items-center rounded-3xl bg-white px-10 py-15 shadow-xl dark:bg-white/10">
          <h1 className="text-gray-600-bold flex justify-center pb-4 text-5xl">Lesson Details</h1>
          <br></br>
          {lesson ? (
            <>
              <h2><b>Title:</b> {lesson.title}</h2>
              <br></br>
            </>
          ) : (
            <p>Loading...</p>
          )}
      </div>
    </div>
    </>
  )
}

export default LessonDetails
