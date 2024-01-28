import { createContext, useContext, useState } from 'react';

const ProfileImageContext: any = createContext(null);

export const ProfileImageProvider = ({ children }: any) => {
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  const setProfileImage = (url: string) => {
    setProfileImageUrl(url);
  };

  const getProfileImage = () => {
    return profileImageUrl;
  }

  return (
    <ProfileImageContext.Provider value={{ profileImageUrl, setProfileImage }}>
      {children}
    </ProfileImageContext.Provider>
  );
};

export const useProfileImage = () => {
  return useContext(ProfileImageContext);
};
