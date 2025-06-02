import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [biomarkers, setBiomarkers] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('/api/users/user', {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Error fetching user:', error.response?.data || error.messsage);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        const initializeAuth = async () => {
            const cachedUser = sessionStorage.getItem('user');
            const cachedBiomarkers = sessionStorage.getItem('biomarkers');

            if (cachedUser && cachedBiomarkers) {
                setUser(JSON.parse(cachedUser));
                setBiomarkers(JSON.parse(cachedBiomarkers));
                setLoading(false);
            } else {
                fetchUser()
            }
        }
        
        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                setUser, 
                biomarkers, 
                setBiomarkers,
                loading
            }}>
            {children}
        </AuthContext.Provider>
    )
}