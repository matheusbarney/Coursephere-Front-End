import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null); 

    async function Login(email, password) {
        try {
            const response = await api.get('/users');
            const users = response.data;
            
            const foundUser = users.find(u => u.email === email && u.password === password )

            if (foundUser) {
                setUser(foundUser)
                console.log('Signed:', foundUser);
                return foundUser;
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ user, Login }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;