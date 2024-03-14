import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  const login = async (username, password) => {
    console.log(`Login attempted for ${username}`);
    setIsLoggedIn(true);
    setUser({ username });
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoginModalVisible(false); 
  };

  const signup = async (userData) => {
    console.log(`Signup attempted`, userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    console.log('User logged out');
  };

  const triggerLoginModal = () => {
    setIsLoginModalVisible(true);
  };

  const hideLoginModal = () => {
    setIsLoginModalVisible(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn,
      login,
      signup,
      logout,
      isLoginModalVisible,
      triggerLoginModal,
      hideLoginModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
