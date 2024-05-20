import {createContext, useContext, useEffect, useState} from "react";
import {doLogin, refreshJwt} from "../service/AuthService";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
    const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const navigate = useNavigate()
    const login = (username, password) => {

        doLogin(username, password)
            .then(response => {
                if (response.status === 200) {
                    const user = jwtDecode(response.data.accessToken)
                    setUserDetails(jwtDecode(response.data.accessToken))
                    setAccessToken(response.data.accessToken);
                    setRefreshToken(response.data.refreshToken);
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                    localStorage.setItem("user", JSON.stringify(user))
                    navigate("/")
                }
            })
    }


    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setUserDetails(null)
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem("user")
        navigate("/sign-in")
    };

    return (
        <AuthContext.Provider value={{userDetails, accessToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);
