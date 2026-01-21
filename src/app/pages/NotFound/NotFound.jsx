
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>

      <h1>Error 404: Page Not Found</h1>
      <br></br>
      <Link to={"/"}>
        <button className="btn-primary">Go back to Dashboard</button>
      </Link>
    </div>
  );
};

export default NotFound