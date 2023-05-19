import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  favorite: { login: string; avatar: string }[];
  email?: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user?: User;
  updateUser: (user: User) => void;
  refetchSession: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const updateUser = (user?: User) => {
    setUser(user);
  };

  const fetchSession = async () => {
    const res = await fetch("/api/session");
    const { user } = await res.json();
    setUser(user);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        updateUser,
        refetchSession: fetchSession,
      }}
    >
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
