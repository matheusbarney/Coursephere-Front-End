import{ useEffect, useState} from 'react';
import { CourseList } from '../atoms/CourseList';
import { StandardHeader } from '../atoms/StandardHeader';
import { LoadingText } from '../atoms/LoadingText';
import { lessonService } from '../../services/lessonService'


export function CourseCard({
  course
}) {

  const [lessons, setLessons] = useState(null);  

  useEffect(() => {
      const loadLessonsData = async () => {
          try {
              const data = await lessonService.getAll();
              setLessons(data);
          } catch (error) {
              console.error('Error loading', error);
          }
      };
      loadLessonsData();
  }, []);

  return <div className="flex-col place-items-center rounded-3xl bg-white px-10 py-15 shadow-xl dark:bg-white/10">
        <StandardHeader text={`Course Details`} />
        <br></br>
        {course ? <CourseList course={course} /> : <LoadingText     />}
      </div>;
}
  