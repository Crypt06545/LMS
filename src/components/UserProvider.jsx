import useUserStore from "@/store/User.Store";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const UserProvider = ({ children }) => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);

  useEffect(() => {
    const setClerkUserAndToken = async () => {
      if (isLoaded && user) {
        setUser(user);
        const token = await getToken();
        setToken(token);
        console.log(token);
      }
    };
    setClerkUserAndToken();
  }, [getToken, isLoaded, setToken, setUser, user]);
  return children;
};

export default UserProvider;