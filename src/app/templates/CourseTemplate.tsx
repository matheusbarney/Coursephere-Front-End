import Button from '../atoms/Button';
//
import { CourseCard } from '../components/CourseCard';
import{ useParams, useNavigate } from 'react-router-dom';


export function CourseTemplate({course}) {
  const { courseId } = useParams();
  const navigate = useNavigate();

  function navigateToEdit() {
    navigate(`/course/${courseId}/manage`);
  }

  return <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-200 to-cyan-400 dark:bg-cyan-950">
        <CourseCard course={course} />
        <div className="pt-8">
          <Button type="button" mainText="Edit Course" showText={true} onClick={navigateToEdit}/>
        </div>
      </div>
    </>;
}
  