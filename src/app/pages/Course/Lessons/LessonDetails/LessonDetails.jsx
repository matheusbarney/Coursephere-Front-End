
import '../../../../../App.css'
import{ use, useEffect, useState} from 'react';
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

      <h1>Lesson Details</h1>
      <br></br>
      {lesson ? (
        <>
          <h2><b>Title:</b> {lesson.title}</h2>
          <br></br>
        </>
      ) : (
        <p>Loading...</p>
      )}

    </>
  )
}

export default LessonDetails
