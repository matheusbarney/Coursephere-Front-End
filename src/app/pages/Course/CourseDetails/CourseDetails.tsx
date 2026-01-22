import { CourseTemplate } from '../../../templates/CourseTemplate';
//
import{ useEffect, useState} from 'react';
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
    <CourseTemplate   course={course}  />
  )
}

export default CourseDetails
