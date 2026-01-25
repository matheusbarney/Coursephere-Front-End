import { SearchItem } from '../molecules/SearchItem';
import { SearchInput } from '../organisms/SearchInput';
import { LoadingText } from '../atoms/LoadingText';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useDebounce } from 'use-debounce';

export function SearchComponent({
  course,
  lessons
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;

    // Read from URL, otherwise defaults
    const searchQuery = searchParams.get('search') || '';
    const statusFilter = searchParams.get('status') || 'All status';

    const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

    // Update URL params
    const setSearchQuery = (query: string) => {
        setSearchParams( prev => {
            if (query) {
                prev.set('search', query);
            } else {
                prev.delete('search');
            }
            return prev;
        });
        setCurrentPage(0); 
    };
    const setStatusFilter = (status: string) => {
        setSearchParams(prev => {
        if (status && status !== 'All status') {
            prev.set('status', status);
        } else {
            prev.delete('status');
        }
        return prev;
        });
        setCurrentPage(0); // Reset to first page on search/filter
    };
    
    // Filter lessons based on URL params
    const filteredLessons = useMemo(() => {
        if (!lessons) return [];
        
        return lessons.filter(lesson => {
        const matchesStatus = 
            statusFilter === 'All status' || 
            lesson.status?.toLowerCase() === statusFilter.toLowerCase();
        
        const matchesSearch = 
            debouncedSearchQuery === '' ||
            lesson.title?.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
        
        return matchesStatus && matchesSearch;
        });
    }, [lessons, statusFilter, debouncedSearchQuery]);
    
    // Pagination
    const offset = currentPage * itemsPerPage;
    const currentLessons = filteredLessons.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredLessons.length / itemsPerPage);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return <div className="pt-9 w-full">
            <SearchInput 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                course={course}
            />
            <div className="flex justify-start flex-col">
                {!lessons ? (
                    <LoadingText />
                ) : filteredLessons.length > 0 ? (
                    <>
                        <ul className='h-57 overflow-auto '>    
                            {currentLessons.map(l => (
                                <li key={l.id} className="">
                                    <SearchItem course={course} lesson={l} />
                                </li>
                            ))}
                        </ul>
                        
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                            containerClassName="flex gap-2 justify-center my-8"
                            pageClassName="inline-block"
                            pageLinkClassName="px-3 py-2 border rounded hover:bg-gray-200"
                            activeClassName="bg-teal-200 text-white"
                            activeLinkClassName="bg-teal-200 text-white hover:bg-gray-200"
                            previousClassName="inline-block"
                            nextClassName="inline-block"
                            previousLinkClassName="px-3 py-2 border rounded hover:bg-gray-200"
                            nextLinkClassName="px-3 py-2 border rounded hover:bg-gray-200"
                        />
                    </>
                ) : (
                    <center className="py-20 text-5xl">No Courses Available.</center>
                )}
            </div>
        </div>;
}
  