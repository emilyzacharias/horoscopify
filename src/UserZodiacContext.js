import React, { createContext, useContext, useState } from 'react';

const UserZodiacContext = createContext();

export const UserZodiacProvider = ({ children }) => {
  const [userZodiac, setUserZodiac] = useState('');

  return (
    <UserZodiacContext.Provider value={{ userZodiac, setUserZodiac }}>
      {children}
    </UserZodiacContext.Provider>
  );
};

export const useUserZodiac = () => useContext(UserZodiacContext);
