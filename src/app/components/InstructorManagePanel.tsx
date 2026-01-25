import { InstructorEntry } from '../molecules/InstructorEntry';
import{ useEffect, useState } from 'react';
import{ useParams } from 'react-router-dom';
import { StandardHeader } from '../atoms/StandardHeader';
import { LoadingText } from '../atoms/LoadingText';
import { useExternalUser } from '../../hooks/useExternalUser'
import { courseService } from '../../services/courseService'
import { userService } from '../../services/userService'

import useToast from '../../hooks/useToast';

export function InstructorManagePanel({}) {

    const { courseId } = useParams();
    const [ instructors, setInstructors ] = useState(null);
    const { user: exUsers, loading } = useExternalUser(3); // Load 3 users from external API.
    const { toastError } = useToast();
    console.log(exUsers);

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
                toastError("Failed to load instructors");
                setInstructors([]);
            }
        };

        loadInstructors();
    }, [courseId]);


    return <div className="flex-col place-items-center rounded-3xl bg-white px-10 py-15 shadow-xl dark:bg-white/10">
        <div>
        <StandardHeader text={`Current Instructors:`} />

            {instructors ? 
            instructors.length > 0 ? 
                <ul>    
                    { instructors.map((c) => <li key={c.id}>
                         <InstructorEntry  user={c} instructorType="Remove"  />
                    </li>) }
                </ul>
                : 
                <p>No instructors currently in the course.</p>
            :
            <LoadingText     />
            }
        </div>
        <div className="pt-3">
            <StandardHeader text={`Suggested Instructors:`} />
            {exUsers ? 
                <ul className=" flex-col flex items-center justify-between">    
                    {Array.isArray(exUsers) && exUsers.map((c) => <li key={c.id} >
                        <InstructorEntry  user={c} instructorType="Add"  />
                    </li>) }
                </ul>
            :
            <LoadingText     />
            }
        </div>
      </div>;
}