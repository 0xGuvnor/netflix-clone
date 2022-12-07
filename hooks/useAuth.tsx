import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { useRouter } from "next/router";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "../firebase";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  loading: false,
  error: null,
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const router = useRouter();

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      router.push("/");
    } catch (error) {
      console.error(error);
      window.alert(error);
      //   setError(error);
    }

    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      router.push("/");
    } catch (error) {
      console.error(error);
      window.alert(error);
      //   setError(error);
    }

    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);

    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
      window.alert(error);
      //   setError(error);
    }

    setLoading(false);
  };

  const memoedValue = useMemo(
    () => ({ user, signUp, signIn, logout, loading, error }),
    [user, loading]
  );

  // persisting the user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // logged in
        setUser(user);
        setLoading(false);
      } else {
        // not logged in
        setUser(null);
        setLoading(true);
        router.push("/login");
      }

      setInitialLoading(false);
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
