import{ useEffect, useState } from 'react';
import{ useParams } from 'react-router-dom';
import { StandardHeader } from '../atoms/StandardHeader';
import { LoadingText } from '../atoms/LoadingText';
import { useAuth } from '../../hooks/useAuth'
import { courseService } from '../../services/courseService'
import { userService } from '../../services/userService'

export function InstructorManagePanel({}) {

    const { courseId } = useParams();
    const [ instructors, setInstructors ] = useState(null);

    useEffect(() => {
        const loadInstructors = async () => {
            try {
                const data = await courseService.getById(courseId);
                const instructorIds = data.instructors;

                if (instructorIds && instructorIds.length > 0) {
                    const userDataPromises = instructorIds.map(id => userService.getById(id));
                    const userData = await Promise.all(userDataPromises);
                    setInstructors( userData );
                }
            } catch (error) {
                console.error('Error loading', error);
                setInstructors([]);
            }
        };

        loadInstructors();
    }, [courseId]);


    return <div className="flex-col place-items-center rounded-3xl bg-white px-10 py-15 shadow-xl dark:bg-white/10">
        <StandardHeader text={`Current Instructors:`} />
        {instructors ? 
        instructors.length > 0 ? 
            <ul>    
                { instructors.map((c) => <li key={c.id}>
                    <div className="py-2">
                        <p className="">{c.name}</p>
                    </div>
                </li>) }
            </ul>
            : 
            <p>No instructors currently in the course.</p>
        :
        <LoadingText     />
        }
      </div>;
}