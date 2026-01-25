import useUser from '../../hooks/useUser';
import { useCourse } from '../../hooks/useCourse';
import { useParams } from 'react-router';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}


interface InstructorEntryProps {
  user: User,
  instructorType: "Remove" | "Add"
};

export function InstructorEntry({user, instructorType}: InstructorEntryProps) {
  const { courseId } = useParams();
  const { addUser, loading: userLoading, error: userError } = useUser();
  const { addInstructor, removeInstructor, loading: courseLoading, error: courseError } = useCourse({ courseId });

  const handleSubmit = async (formData: User) => {
    try {
      if (instructorType === "Add") {
        // First add the user to the database
        const newUser = await addUser(formData);
        console.log('User created:', newUser);
        
        // Then add them as an instructor to the course
        await addInstructor(newUser.id);
        console.log('Instructor added to course');
        window.location.reload(); // Reload to see results
      } else {
        // Remove instructor from course
        await removeInstructor(user.id);
        console.log('Instructor removed from course');
        window.location.reload();
      }
    } catch (err) {
      console.error('Error in handleSubmit:', err);
    }
  };

  const isLoading = userLoading || courseLoading;

  return <div>
        {instructorType === "Remove" ? 
            <div className=" h-min border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 
                        bg-white hover:bg-red-200 rounded-xl m-1 flex justify-between leading-normal shadow-lg p-4 mx-auto w-110"
            onClick={() => handleSubmit(user)}>
            <p className="">{user.name}</p>
            <p>-</p>
        </div> : 
             <div className=" h-min border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 
                        bg-white hover:bg-green-200 rounded-xl m-1 flex justify-between leading-normal shadow-lg p-4 mx-auto w-110"
              onClick={() => handleSubmit(user)}>
            <p className="">{user.name}</p>
            <p>+</p>
        </div>
        }
    </div>
}
  