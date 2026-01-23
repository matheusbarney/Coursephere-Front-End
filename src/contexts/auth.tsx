import React, { createContext, useState, ReactNode } from 'react';
import api from '../services/api';


interface User {
    id: number;
    email: string;
    password: string;
}


interface AuthContextType {
    user: User | null;
    Login: (email: string, password: string) => Promise<User>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    }); 

    async function Login(email: string, password: string): Promise<User> {
        try {
            const response = await api.get('/users');
            const users = response.data;
            
            const foundUser = users.find((u: User) => u.email === email && u.password === password);

            if (foundUser) {
                setUser(foundUser);
                localStorage.setItem('user', JSON.stringify(foundUser));
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