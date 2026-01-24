import { Link } from 'react-router-dom';
import { SearchInput } from '../organisms/SearchInput';
import { LoadingText } from '../atoms/LoadingText';

export function SearchComponent({
  course,
  lessons
}) {
  return <div className="pt-9">
            <SearchInput />
            {lessons ? lessons.length > 0 ? <ul>    
                    {lessons.map(c => <li key={c.id}>
                        <div className="py-4">
                            <Link to={`/course/${course.id}/lesson/${c.id}`}>
                                <p className="font-bold">{c.title}</p>
                            </Link>
                            <p>{c.description}</p>
                        </div>
                    </li>)}
                </ul> : <p>No Courses Available.</p> : <LoadingText />}
        </div>;
}
  