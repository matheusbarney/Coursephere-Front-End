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
    const loadCourse = async () => {
        try {
          const data = await courseService.getById(courseId);
          setCourse(data);
        } catch (error) {
          console.error('Error loading course', error);
        }
      };
      loadCourse();
  }, []);
  
  return (
    <CourseTemplate   course={course}  />
  )
}

export default CourseDetails
