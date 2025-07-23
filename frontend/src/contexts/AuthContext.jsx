import {createContext ,useContext, useState , useEffect} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [loading, setIsloading] = useState(true)


}

