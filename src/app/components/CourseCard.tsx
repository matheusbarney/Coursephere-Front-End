import { SearchComponent } from '../components/SearchComponent';
import { CourseList } from '../atoms/CourseList';
import { StandardHeader } from '../atoms/StandardHeader';
import { LoadingText } from '../atoms/LoadingText';
import { useLessons } from '../../hooks/useLessons';
import { useParams } from 'react-router';

export function CourseCard({ course }) {
    const {courseId} = useParams();
    const { lessons, loading, error } = useLessons({courseId});

    const renderContent = () => {
        if (!course || loading) return <LoadingText />;
        if (error) return <p className="text-red-500">Error loading lessons.</p>;
        return (
            <>
                <br />
                <CourseList course={course} />
                <SearchComponent course={course} lessons={lessons} />
            </>
        );
    };

    return (
        <div className="flex-col place-items-center rounded-3xl bg-white px-2 py-15 shadow-xl dark:bg-white/10">
            <StandardHeader text="Course Details" />
            {renderContent()}
        </div>
    );
}