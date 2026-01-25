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
  return <div>
        {instructorType === "Remove" ? 
            <div className=" h-min border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 
                        bg-white hover:bg-red-200 rounded-xl m-1 flex justify-between leading-normal shadow-lg p-4 mx-auto w-110">
            <p className="">{user.name}</p>
            <p>-</p>
        </div> : 
             <div className=" h-min border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 
                        bg-white hover:bg-green-200 rounded-xl m-1 flex justify-between leading-normal shadow-lg p-4 mx-auto w-110">
            <p className="">{user.name}</p>
            <p>+</p>
        </div>
        }
    </div>
}
  