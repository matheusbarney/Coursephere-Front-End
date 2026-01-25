import { useState } from 'react';

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
};

export function SearchInput({searchQuery, setSearchQuery, statusFilter, setStatusFilter}: SearchInputProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const statuses = ['All status', 'Draft', 'Published', 'Archived'];

    const handleStatusSelect = (status: string) => {
        setStatusFilter(status);
        setIsDropdownOpen(false);
    };

    return (

        <form className="max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}> 
            <div className="flex shadow-xs rounded-base -space-x-0.5 gap-2">
                <div className="relative">
                    <label htmlFor="search-dropdown" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Your Email</label>
                    <button id="dropdown-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} data-dropdown-toggle="dropdown" type="button" className="rounded-2xl w-36 h-full inline-flex items-center shrink-0 z-10 text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-s-base text-sm px-4 py-2.5 focus:outline-none">
                        <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"/></svg>
                        {statusFilter}
                        <svg className="w-4 h-4 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/></svg>
                    </button>
                    <div id="dropdown" className={`z-10 ${isDropdownOpen ? 'absolute' : 'hidden'} bg-teal-50 border border-default-medium rounded-base shadow-lg w-36`}>
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

                <input type="search" id="search-dropdown" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-2xl px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-xl focus:ring-brand focus:border-brand block w-2xl placeholder:text-body" 
                placeholder="Search lessons" required />

            </div>
        </form>

    );
};
  