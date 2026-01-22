
import{ use, useEffect, useState} from 'react';
import{ useParams } from 'react-router-dom';
import { courseService } from '../../../../services/courseService'

function CourseDetails() {
  const { courseId } = useParams();
  //
  const [course, setCourse] = useState(null);


  useEffect(() => {
    const loadCourses = async () => {
        try {
          const data = await courseService.getById(courseId);
          setCourse(data);
        } catch (error) {
          console.error('Error loading', error);
        }
      };
      loadCourses();
  }, []);
  
  return (
    <>
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-200 to-cyan-400 dark:bg-cyan-950">
      <div className="flex-col place-items-center rounded-3xl bg-white px-10 py-15 shadow-xl dark:bg-white/10">
        <h1 className="text-gray-600-bold flex justify-center pb-4 text-5xl">Course Details</h1>
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
      </div>
    </div>
    </>
  )
}

export default CourseDetails
