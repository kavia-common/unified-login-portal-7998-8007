import React, { createContext, useContext, useState } from 'react';

const AuthCtx = createContext({
  user: null,
  setUser: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => setUser(null);

  return (
    <AuthCtx.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthCtx.Provider>
  );
};

// PUBLIC_INTERFACE
export const useAuth = () => {
  /** Access auth state and methods. */
  return useContext(AuthCtx);
};
