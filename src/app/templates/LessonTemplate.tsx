import Button from '../atoms/Button';
//
import { LessonCard } from '../components/LessonCard';
import{ useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export function LessonTemplate({lesson}) {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { canManageLesson } = useAuth();

  function navigateToEdit() {
    navigate(`/course/${courseId}/lesson/${lessonId}/edit`);
  }

  return <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-200 to-cyan-400 dark:bg-cyan-950">
        <LessonCard lesson={lesson} />

        {canManageLesson(lessonId) && (
          <div className="pt-8">
            <Button type="button" mainText="Edit Lesson" showText={true} onClick={navigateToEdit}/>
          </div>
        )}
      </div>
    </>;
}
  