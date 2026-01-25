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

  return <div className="border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 
                        bg-white hover:bg-teal-50 rounded-xl p-4 m-4 flex flex-col justify-between leading-normal shadow-lg">
            <Link to={`/course/${course.id}/course-details`}>
                <p className="font-bold">{course.name}</p>
            <p>{course.description}</p>
            <p>Start: {formatDate(course.start_date)}</p>
            <p>End: {formatDate(course.end_date)}</p>
            </Link>
        </div>;
}
  