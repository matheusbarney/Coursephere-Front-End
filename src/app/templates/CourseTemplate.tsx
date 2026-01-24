import Button from '../atoms/Button';
//
import { CourseCard } from '../components/CourseCard';
import{ useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useCourse } from '../../hooks/useCourse';
import { LoadingText } from '../atoms/LoadingText';

export function CourseTemplate() {
  const { courseId } = useParams();
  const { course, loading, error } = useCourse({courseId});

  const navigate = useNavigate();
  const { canManageCourse } = useAuth();

  function navigateToEdit() {
    navigate(`/course/${courseId}/edit`);
  }

  const renderContent = () => {
        if (loading) return <LoadingText />;
        if (error) return <p className="text-red-500">Error loading course.</p>;
    return (
      <>
          <CourseCard course={course} />

          {canManageCourse(courseId) && (
            <div className="pt-8">
              <Button type="button" mainText="Edit Course" showText={true} onClick={navigateToEdit}/>
            </div>
          )}
      </>)
  };

  return <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-200 to-cyan-400 dark:bg-cyan-950">
      {renderContent()};
      </div>
    </>;
}
  