import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import urls from "./urls";
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext);
}



export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [notificationMessage, setNotificationMessage] = useState("")
    const [notificationSeverity, setNotificationSeverity] = useState("success")
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const navigator = useNavigate();
    async function signin(email, password) {
        try {
            const response = await axios.post(`${urls.SIGNIN}`, { email, password });
            setCurrentUser(response.data);
            console.log(response.data)
            localStorage.setItem('webt-bookrating-currentUser', JSON.stringify(response.data))
            return response.data;
        } catch (error) {
            console.log(error.response.data)
            return error.response.data;
        }

    }

    async function signup(first_name, last_name, email, password) {
        try {
            const response = await axios.post(`${urls.SIGNUP}`, { first_name, last_name, email, password });
            return response.data;
        } catch (error) {
            return error.response;
        }
    }
    async function getImage(bookName) {
        return await axios.get(`${urls.IMAGE}/${bookName}`, {
            headers: {
                "x-access-token": currentUser ? currentUser.token : null
            }
        })
    }

    async function rate(bookId, userId, rating) {
        return await axios.post(`${urls.RATE}`, { bookId, userId, rating }, {
            headers: {
                "x-access-token": currentUser ? currentUser.token : null
            }
        })
    }
    async function getBooks(page) {
        return await axios.get(`${urls.BOOKS}/${currentUser.email}/${page}`, {
            headers: {
                "x-access-token": currentUser ? currentUser.token : null
            }
        });
    }
    function signout() {
        localStorage.removeItem('webt-bookrating-currentUser')
        return setCurrentUser(null)
    }
    async function verify() {
        let user = localStorage.getItem('webt-bookrating-currentUser')
        let localSavedUser = JSON.parse(user)
        console.log(localSavedUser)
        await axios.get(`${urls.VERIFY}`, {
            headers: {
                "x-access-token": localSavedUser ? localSavedUser.token : null
            }
        })
            .then(() => setCurrentUser(localSavedUser)).then(() => {
                setNotificationMessage("User logged in successfully")
                setNotificationSeverity("success")
                setIsNotificationOpen(true)
                navigator("/")
            }).catch(error => {
                console.log(error)
                setNotificationMessage("Failed to login using existing token!!")
                setNotificationSeverity("danger")
                setIsNotificationOpen(true)
            })
    }

    useEffect(() => {
        verify()
    }, [])

    const value = { currentUser, notificationMessage, notificationSeverity, isNotificationOpen, signin, signup, signout, getImage, rate, getBooks }
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}