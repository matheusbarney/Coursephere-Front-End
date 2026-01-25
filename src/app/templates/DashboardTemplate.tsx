import Button from '../atoms/Button';
import { DashboardMain } from '../components/DashboardMain';
import { useContext } from 'react';
import AuthContext from '../../contexts/auth';
import{ useNavigate, Link } from 'react-router-dom';

import useToast from '../../hooks/useToast';

export function DashboardTemplate({}) {

  const { Logout } = useContext(AuthContext);
  const { toastError, toastInfo } = useToast();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await Logout();
      toastError("Logged out of account.");
      navigate(`/login`);
    } catch (error) {
      toastError("Failed to log out.");
    }
  }



  return <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-200 to-cyan-400 dark:bg-cyan-950">
        <DashboardMain     />
        <div className="flex justify-center gap-10">
          <div className="pt-8">
            <Button type="button" mainText="Logout" showText={true} onClick={handleLogout}/>
          </div>
          <div className="pt-8">
            <Link to="/courses/new"><Button type="button" mainText="New Course" showText={true} /></Link>
          </div>
        </div>
      </div>;
}
  

