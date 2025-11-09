import React, { createContext, useEffect, useState } from 'react'
import { initialLoginFormData, initialRegisterFormData } from '@/config'
import axios from 'axios';
import { toast } from "sonner"
import { useNavigate } from 'react-router-dom';

export const AuthState = createContext(null);
function AuthContext({ children }) {
    const [loginFormData, setLoginFormData] = useState(initialLoginFormData);
    const [registerFormData, setRegisterFormData] = useState(initialRegisterFormData);
    const [activeTab, setActiveTab] = useState("login");
    const [isLoading, setIsLoading] = useState(false);
    const [authIsLoading, setAuthIsLoading] = useState(true);
    const [auth, setAuth] = useState(
        {
            authenticate: false,
            user: null
        }
    );


    const naviagte = useNavigate();

    const handleRegisterUser = async (event) => {
        try {
            event.preventDefault();
            setIsLoading(true)
            const responce = await axios.post("http://localhost:5000/api/v1/auth/register", registerFormData);
            toast(responce.data.msg);
            if (responce.data.success) {
                setActiveTab("login");
                setRegisterFormData(initialRegisterFormData)
            }
        } catch (error) {
            toast(error.message);
        } finally {
            setIsLoading(false)
        }
    }

    const handleLoginUser = async (event) => {
        try {
            event.preventDefault();
            setIsLoading(true)
            const responce = await axios.post("http://localhost:5000/api/v1/auth/login", loginFormData);
            if (responce.data.success) {
                sessionStorage.setItem("accessToken", responce.data.data.accessToken);
                setAuth({
                    authenticate: true,
                    user: responce.data.data.user
                })

                if (responce.data.data.user?.role == "instructor") {
                    naviagte("/instructor")
                } else {
                    naviagte("/student")
                }
                setLoginFormData(initialLoginFormData)
            } else {
                setAuth({
                    authenticate: false,
                    user: null
                })
            }
            toast(responce.data.msg);
        } catch (error) {
            toast(error.message);
        } finally {
            setIsLoading(false)
        }
    }

    const handleCheckAuth = async () => {
        try {
            setAuthIsLoading(true)
            const responce = await axios.get("http://localhost:5000/api/v1/auth/check-auth", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                }
            });
            if (responce.data.success) {
                setAuth({
                    authenticate: true,
                    user: responce.data.data.userData
                })
            }
            else {
                setAuth({
                    authenticate: false,
                    user: null
                })
            }
        } catch (error) {
            setAuth({
                authenticate: false,
                user: null
            })

        } finally {
            setAuthIsLoading(false)
        }
    }

    const handleOnLogout = () => {
        sessionStorage.removeItem("accessToken");
        setAuth(
            {
                authenticate: false,
                user: null
            }
        )
        toast("Logout Successfully");
        naviagte("/auth");
    }


    return (
        <AuthState.Provider value={{ loginFormData, setLoginFormData, registerFormData, activeTab, setActiveTab, setRegisterFormData, handleRegisterUser, handleLoginUser, isLoading, auth, handleCheckAuth, handleOnLogout, authIsLoading }}>
            {children}
        </AuthState.Provider>
    )
}

export default AuthContext