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
                <StandardHeader text={course.name} />
                <div className="pt-4"><CourseList course={course} /></div>
                <SearchComponent course={course} lessons={lessons} />
            </>
        );
    };

    return (
        <div className="h-xl flex-col place-items-center rounded-3xl bg-white px-2 py-8 shadow-xl dark:bg-white/10">
            {renderContent()}
        </div>
    );
}