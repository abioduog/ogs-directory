import React, { useEffect, useState } from 'react';
import UserProfileCard from './UserProfileCard';
import SearchBar from './SearchBar';
import styles from '.././styles/VerticalCard.module.css';
import { db, storage } from '../lib/firebase';

const UsersProfile = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
            .ref('users/default_profile_image.png')
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

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const filteredUserProfiles = userProfiles.filter((userProfile) =>
    `${userProfile.firstname} ${userProfile.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar onSearch={handleSearchChange} />
      <div className={styles.gridContainer}>
        {filteredUserProfiles.map((userProfile) => (
          <UserProfileCard key={userProfile.id} {...userProfile} />
        ))}
      </div>
    </div>
  );
};

export default UsersProfile;

