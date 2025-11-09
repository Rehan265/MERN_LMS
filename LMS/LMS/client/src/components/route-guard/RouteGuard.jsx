import { AuthState } from '@/context/auth-context/Auth-Context';
import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function RouteGuard({ authenticate, user, element }) {

    const location = useLocation();

    const { authIsLoading } = useContext(AuthState)


    if (authIsLoading) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-2xl shadow-md animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
                <div className="space-y-4">
                    <div className="h-10 bg-gray-300 rounded"></div>
                    <div className="h-10 bg-gray-300 rounded"></div>
                    <div className="h-10 bg-gray-300 rounded"></div>
                </div>
                <div className="h-10 bg-gray-400 rounded w-1/2 mx-auto mt-4"></div>
            </div>
        </div>;
    }


    if (!authenticate && !location.pathname.includes("/auth")) {
        return <Navigate to={"/auth"} />
    }

    if (authenticate && user.role == "student" && location.pathname.includes("/instructor")) {
        return <Navigate to={"/student"} />
    }

    if (authenticate && user.role == "instructor" && location.pathname.includes("/student")) {
        return <Navigate to={"/instructor"} />
    }

    if (authenticate && location.pathname.includes("/auth")) {
        if (user.role == "instructor") {
            return <Navigate to={"/instructor"} />
        } else {
            return <Navigate to={"/student"} />
        }
    }

    return element;


}

export default RouteGuard