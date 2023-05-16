import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  favorite?: string[];
  email?: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user?: User;
  updateUser: (user: User) => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const updateUser = (user: User) => {
    setUser(user);
  };
  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/session");
      const data = await res.json();
      setUser(data);
    };

    fetchSession();
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Hook useAuth must be used inside of AuthContextProvider");
  }

  return context;
};
