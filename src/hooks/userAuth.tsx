import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from '../services/firebase'; 
import Lottie from "lottie-react";
import loadingAnimation from "../assets/ic_loading.json";

interface AuthContextType {
  currentUser: User | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Lottie animationData={loadingAnimation} loop className="w-full h-48 mt-10 mx-auto" />;
  }

  return (
    <AuthContext.Provider value = {{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
