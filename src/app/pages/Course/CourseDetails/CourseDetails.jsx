
import '../../../../App.css'
import{ use, useEffect, useState} from 'react';
import{ useParams } from 'react-router-dom';

function CourseDetails() {
  const { courseId } = useParams();
  //
  const [courses, setCourse] = useState(null);


  useEffect(() => {
    fetch('http://localhost:8000/courses')
      .then(res => {
        return res.json()
      })
      .then(data => {
        setCourse(data);
      })
  }, []);

  const course = courses?.find(course => course.id === courseId);

  return (
    <>

      <h1>Course Details</h1>
      <br></br>
      {course ? (
        <>
          <h2><b>Name:</b> {course.name}</h2>
          <h2><b>Description:</b> {course.description}</h2>
          <h2><b>Start Date:</b> {course.start_date}</h2>
          <h2><b>End Date:</b> {course.end_date}</h2>
          <br></br>
        </>
      ) : (
        <p>Loading...</p>
      )}

    </>
  )
}

export default CourseDetails
