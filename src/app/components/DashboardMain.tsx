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
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 py-4">
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
        <div className="flex-col place-items-center rounded-3xl bg-white px-10 py-8 lg:py-15 shadow-xl dark:bg-white/10
        h-140 md:h-155 lg:h-160
        mx-40">
            <div className="py-0 mx-5 lg:mx-0 lg:py-5">
                <StandardHeader text="My Dashboard" />
            </div>
            {renderContent()}
        </div>
    );
}
  