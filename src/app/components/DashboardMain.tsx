import { DashCard } from '../organisms/DashCard';

import { LoadingText } from '../atoms/LoadingText';
import { StandardHeader } from '../atoms/StandardHeader';
//
import{ useMemo } from 'react';
//
import { useAuth } from '../../hooks/useAuth'
import { useCourses } from '../../hooks/useCourses';

export function DashboardMain({}) {

    const { canManageCourse, isInstructor } = useAuth();
    const { courses, loading, error } = useCourses();

   const myCourses = useMemo(() => {
        if (!courses) return [];
        return courses.filter(c => canManageCourse(c.id) || isInstructor(c.id));
    }, [courses, canManageCourse, isInstructor]);


    const renderContent = () => {
        if (loading) return <LoadingText />;
        if (error) return <p className="text-red-500">Error loading lessons.</p>;
        return (
            <>
            {myCourses.length > 0 ? (
                <ul>
                    {myCourses.map((c) => (
                        <li key={c.id}>
                            <DashCard   course={c}  />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Courses Available.</p>
            )}
            </>
        );
    };

    return (
        <div className="flex-col place-items-center rounded-3xl bg-white px-10 py-15 shadow-xl dark:bg-white/10">
            <StandardHeader text="My Dashboard" />
            {renderContent()}
        </div>
    );
}
  