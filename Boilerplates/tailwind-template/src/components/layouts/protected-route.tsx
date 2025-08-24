import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedProps {
    children: ReactNode;
    allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedProps) => {
   const isLoading = false; // Replace with actual loading state
   const isLoginLoading = false; // Replace with actual login loading state
   const user = {role:"admin"}; // Replace with actual user state, e.g., from context or state management

    // Wait until auth state is loaded
    if (isLoginLoading) 
        return <div className="text-center py-8">Loading...</div>;
    

    if (user && allowedRoles.includes(user.role?.toLowerCase()))
        return children;
    

    return <Navigate to="/login" />;
};

export default ProtectedRoute;
