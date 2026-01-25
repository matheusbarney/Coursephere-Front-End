import { useState } from 'react';
import{ Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  course;
};

export function SearchInput({searchQuery, setSearchQuery, statusFilter, setStatusFilter, course}: SearchInputProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { isInstructor } = useAuth();

    const statuses = ['All status', 'Draft', 'Published', 'Archived'];

    const handleStatusSelect = (status: string) => {
        setStatusFilter(status);
        setIsDropdownOpen(false);
    };

    return (
        <form className="w-full max-w-2xl " onSubmit={(e) => e.preventDefault()}> 
            <div className="flex shadow-xs rounded-base gap-1 lg:gap-2 w-full">
                <div className="relative flex-shrink-0">
                    <label htmlFor="search-dropdown" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Your Email</label>
                    <button 
                        id="dropdown-button" 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                        data-dropdown-toggle="dropdown" 
                        type="button" 
                        className="rounded-2xl w-20 lg:w-32 h-full inline-flex items-center justify-center shrink-0 z-10 text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 text-sm px-2 sm:px-4 py-2.5 focus:outline-none"
                    >
                        <svg className="w-4 h-4 me-1 sm:me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"/>
                        </svg>
                        <span className="truncate text-xs">{statusFilter}</span>
                        <svg className="w-4 h-4 ms-1 sm:ms-1.5 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
                        </svg>
                    </button>
                    <div id="dropdown" className={`z-10 ${isDropdownOpen ? 'absolute' : 'hidden'} bg-teal-50 border border-default-medium rounded-base shadow-lg w-32 sm:w-36`}>
                        <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdown-button">
                            {statuses.map((status) => (
                                <li key={status}>
                                    <button
                                        type="button"
                                        onClick={() => handleStatusSelect(status)}
                                        className="block w-full text-left p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded-md"
                                    >
                                        {status}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <input 
                    type="search" 
                    id="search-dropdown" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-2xl px-3 py-2.5 bg-white border border-default-medium text-heading text-base sm:text-xl focus:ring-brand focus:border-brand flex-1 min-w-0 placeholder:text-body" 
                    placeholder="Search lessons" 
                />
                
                {isInstructor(course.id) && (
                    <Link to={`/course/${course.id}/lesson/new`} className="flex-shrink-0">
                        <button
                            className="rounded-2xl px-3 bg-white border border-default-medium text-2xl hover:bg-neutral-200 aspect-square h-full" 
                        >
                            +
                        </button>
                    </Link>
                )}
            </div>
        </form>
    );
};
  