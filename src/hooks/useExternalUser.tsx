import axios from 'axios';
import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface RandomUserResponse {
  name: {
    first: string;
    last: string;
  };
  email: string;
  login: {
    uuid: string;
    password: string;
  };
}

export const useExternalUser = (amount: number = 1) => {
  const [randomUserList, setUsers] = useState<User | User[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://randomuser.me/api/?results=${amount}`)
      .then(response => {
        const results: RandomUserResponse[] = response.data.results;
        
        const mappedUsers = results.map((randomUser, index) => ({
          id: randomUser.login.uuid,
          name: `${randomUser.name.first} ${randomUser.name.last}`,
          email: randomUser.email,
          password: randomUser.login.password
        }));
        
        setUsers(amount === 1 ? mappedUsers[0] : mappedUsers);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, [amount]);

  return { user: randomUserList, loading };
}