import { LessonTemplate } from '../../../../templates/LessonTemplate';
//
import{ useEffect, useState} from 'react';
import{ useParams } from 'react-router-dom';
import { lessonService } from '../../../../../services/lessonService'

function LessonDetails() {
  const { lessonId } = useParams();
  //
  const [lesson, setLesson] = useState(null);


  useEffect(() => {
      const loadLessons = async () => {
          try {
            const data = await lessonService.getById(lessonId);
            setLesson(data);
            console.log(data)
          } catch (error) {
            console.error('Error loading lesson', error);
          }
        };
        loadLessons();
    }, []);
    
    return (
      <LessonTemplate   lesson={lesson}  />
    )
  }

export default LessonDetails
