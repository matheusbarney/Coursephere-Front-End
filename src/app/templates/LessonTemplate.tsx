import Button from '../atoms/Button';
//
import { LessonCard } from '../components/LessonCard';
import{ useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useLesson } from '../../hooks/useLesson';
import { LoadingText } from '../atoms/LoadingText';

export function LessonTemplate() {
  const { courseId, lessonId } = useParams();
  const { lesson, loading, error } = useLesson({lessonId});

  const navigate = useNavigate();
  const { canManageLesson } = useAuth();

  function navigateToEdit() {
    navigate(`/course/${courseId}/lesson/${lessonId}/edit`);
  }

  const renderContent = () => {
        if (loading) return <LoadingText />;
        if (error) return <p className="text-red-500">Error loading course.</p>;
    return (
      <>
        <LessonCard lesson={lesson} />

        {canManageLesson(lessonId) && (
          <div className="pt-8">
            <Button type="button" mainText="Edit Lesson" showText={true} onClick={navigateToEdit}/>
          </div>
        )}
      </>)
  };

  return <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-200 to-cyan-400 dark:bg-cyan-950">
      {renderContent()}
      </div>
    </>;
}
  