import { Link } from 'react-router-dom';

function User() {
    const dummyUsers = [
        { id: 1, name: 'John Doe',},
        { id: 2, name: 'Jane Smith',},
    ];
    
    return(
        <div>
            <h1>User Page</h1>
            <ul>
                {dummyUsers.map((user) => (
                    <li key={user.id}>    
                        <Link to={`user/${user.id}`}>
                            <h2>{user.title}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default User