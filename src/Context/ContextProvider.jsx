import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config';

export const MpContext = createContext(null);
const ContextProvider = ({ children }) => {
    // const axiosPublic = useAxiosPublic()

    const [userEmail, setUserEmail] = useState(null) // this email use for go to  profile 
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signUpUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser || !currentUser){
                setUser(currentUser);
                setLoading(false)
            }
           
            // console.log('observer', currentUser);
            return () => unsubscribe();
        });

    }, []);



    const useInfo = {
        signUpUser,
        loginUser,
        user,
        logOut,
        loading, 
        userEmail, 
        setUserEmail
    }
    return (
        <MpContext.Provider value={useInfo}>
            {children}
        </MpContext.Provider>
    );
};

export default ContextProvider;