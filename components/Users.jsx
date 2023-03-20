import React, { useEffect, useState } from 'react';
import UserProfileCard from './UserProfileCard';
import styles from '.././styles/global.module.css';
import { db, storage } from '../lib/firebase';

const UsersProfile = () => {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await db.collection('usersProfile').get();
      const data = querySnapshot.docs.map(async (doc) => {
        const userData = doc.data();
        let imgUrl;
        try {
          imgUrl = await storage.ref(`users/${doc.id}`).getDownloadURL();
        } catch (error) {
          console.error(error);
          imgUrl = await storage
            .ref('users/default_profile_image.jpg')
            .getDownloadURL();
        }
        return {
          id: doc.id,
          imgUrl,
          ...userData,
        };
      });
      const resolvedData = await Promise.all(data);
      setUserProfiles(resolvedData);
    };
    fetchData();
  }, []);
  

  return (
    <div className={styles.gridContainer}>
      {userProfiles.map((userProfile) => (
        <UserProfileCard key={userProfile.id} {...userProfile} />
      ))}
    </div>
  );
};

export default UsersProfile;

