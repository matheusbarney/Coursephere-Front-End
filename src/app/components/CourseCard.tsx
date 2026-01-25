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
                <div className="pt-12"><StandardHeader text={course.name} /></div>
                <div className="pt-2 md:pt-8"><CourseList course={course} /></div>
                <SearchComponent course={course} lessons={lessons} />
            </>
        );
    };

    return (
        <div className="border border-gray-400 bg-white
                            rounded-xl  py-4 px-6
                            flex flex-col justify-between items-center leading-normal 
                            shadow-lg transition-all duration-200
                            h-148 md:h-152 lg:h-170 
                            w-80 md:w-3xl lg:w-4xl
                            text-xs md:text-base lg:text-xl
                            ">
            {renderContent()}
        </div>
    )
}