import { Link } from 'react-router-dom';

export function DashCard({
  course
}) {

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

  return <div className="border border-gray-400 bg-white hover:bg-teal-50 
                            rounded-xl p-3 sm:p-4 
                            flex flex-col justify-between leading-normal 
                            shadow-lg hover:shadow-xl transition-all duration-200
                            h-full lg:h-100
                            text-xs md:text-base lg:text-xl
                            ">
            <Link to={`/course/${course.id}/course-details`}>
                <p className="font-bold">{course.name}</p>
            <p>{course.description}</p>
            <p>Start: {formatDate(course.start_date)}</p>
            <p>End: {formatDate(course.end_date)}</p>
            </Link>
        </div>;
}
  