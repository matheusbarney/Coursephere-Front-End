import{ useEffect, useState} from 'react';
import { CourseList } from '../atoms/CourseList';
import { StandardHeader } from '../atoms/StandardHeader';
import { LoadingText } from '../atoms/LoadingText';
import { lessonService } from '../../services/lessonService'
import { Link } from 'react-router-dom';

export function CourseCard({course}) {

  const [lessons, setLessons] = useState(null);  

  useEffect(() => {
      const loadLessonsData = async () => {
          try {
            console.log(course);
            const data = await lessonService.getByCourse(course.id);
            setLessons(data);
          } catch (error) {
              console.error('Error loading', error);
          }
      };
      if (course?.id) { loadLessonsData(); }
  }, [course]);

  return <div className="flex-col place-items-center rounded-3xl bg-white px-10 py-15 shadow-xl dark:bg-white/10">
        <StandardHeader text={`Course Details`} />
        <br></br>
        {course ? <CourseList course={course} /> : <LoadingText     />}
        {lessons ? 
        lessons.length > 0 ? 
            <ul>    
                { lessons.map((c) => <li key={c.id}>
                    <div className="py-4">
                        <Link to={`/course/${course.id}/lesson/${c.id}`}>
                            <p className="font-bold">{c.title}</p>
                        </Link>
                        <p>{c.description}</p>
                    </div>
                </li>) }
            </ul>
            : 
            <p>No Courses Available.</p>
        :
        <LoadingText     />
        }
      </div>;
}
  