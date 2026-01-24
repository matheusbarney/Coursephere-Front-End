
import { LoadingText } from '../atoms/LoadingText';
import { StandardHeader } from '../atoms/StandardHeader';
//
import{ useEffect, useState} from 'react';
import { courseService } from '../../services/courseService'
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'

export function DashboardMain({}) {

    const [courses, setCourses] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const loadCoursesData = async () => {
            try {
                // const data = await courseService.getAll();
                const data = await courseService.getByUser(user.id);
                setCourses(data);

            } catch (error) {
                console.error('Error loading', error);
            }
        };
        loadCoursesData();
    }, []);



return <div className="flex-col place-items-center rounded-3xl bg-white px-10 py-15 shadow-xl dark:bg-white/10">
        <StandardHeader text={`My Dashboard`} />
        {courses ? 
        courses.length > 0 ? 
            <ul>    
                { courses.map((c) => <li key={c.id}>
                    <div className="py-4">
                        <Link to={`/course/${c.id}/course-details`}>
                            <p className="font-bold">{c.name}</p>
                        </Link>
                        <p>{c.description}</p>
                    </div>
                </li>) }
            </ul>
            : 
            <p>No Courses Available.</p>
        :
        <LoadingText     />
        }
        </div>;
}
  