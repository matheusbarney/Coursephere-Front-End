import { userService, User } from '../services/userService';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface UseUserProps {
  userId?: string;
}

export const useUser = ({ userId }: UseUserProps = {}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { RefreshPermissions } = useAuth();

  const addUser = async (userData: Omit<User, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await userService.addUser(userData);
      setUser(newUser);
      RefreshPermissions();
      return newUser;
    } catch (err) {
      console.error('Error adding user:', err);
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, addUser };
};

export default useUser;