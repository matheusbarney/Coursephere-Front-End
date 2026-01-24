import { SearchComponent } from '../components/SearchComponent';
import { CourseList } from '../atoms/CourseList';
import { StandardHeader } from '../atoms/StandardHeader';
import { LoadingText } from '../atoms/LoadingText';
import { useLessons } from '../../hooks/useLessons';

export function CourseCard({ course }) {
    console.log(course);
    const { lessons, loading, error } = useLessons(course?.id);

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
        <div className="flex-col place-items-center rounded-3xl bg-white px-10 py-15 shadow-xl dark:bg-white/10">
            <StandardHeader text="Course Details" />
            {renderContent()}
        </div>
    );
}