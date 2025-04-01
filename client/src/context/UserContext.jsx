import { createContext, useState, useContext } from "react";

// Tạo Context
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  const login = (name) => {
    setUsername(name);
  };

  return (
    <UserContext.Provider value={{ username, login }}>
      {children}
    </UserContext.Provider>
  );
};
