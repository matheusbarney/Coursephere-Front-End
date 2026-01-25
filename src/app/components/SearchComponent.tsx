import { SearchItem } from '../molecules/SearchItem';
import { SearchInput } from '../organisms/SearchInput';
import { LoadingText } from '../atoms/LoadingText';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export function SearchComponent({
  course,
  lessons
}) {
    const [searchParams, setSearchParams] = useSearchParams();

    // Read from URL, otherwise defaults
    const searchQuery = searchParams.get('search') || '';
    const statusFilter = searchParams.get('status') || 'All status';

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
    };
    
    // Filter lessons based on URL params
    const filteredLessons = useMemo(() => {
        if (!lessons) return [];
        
        return lessons.filter(lesson => {
        const matchesStatus = 
            statusFilter === 'All status' || 
            lesson.status?.toLowerCase() === statusFilter.toLowerCase();
        
        const matchesSearch = 
            searchQuery === '' ||
            lesson.title?.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesStatus && matchesSearch;
        });
    }, [lessons, statusFilter, searchQuery]);
    
    return <div className="pt-9 bg-red-500">
            <SearchInput 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />
            <div className="bg-blue-500 flex justify-start flex-col">
                {lessons ? filteredLessons.length > 0 ? <ul>    
                        {filteredLessons.map(l => <li key={l.id}>
                            <div className="bg-green-500 w-min">
                                <SearchItem  course={course} lesson={l}   />
                            </div>
                        </li>)}
                    </ul> : <p>No Courses Available.</p> : <LoadingText />}
            </div>
        </div>;
}
  