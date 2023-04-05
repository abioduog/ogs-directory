import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, doc, getDocs, getDoc, query, where } from "firebase/firestore";
import db from "../../firebase/config";

import styles from '../../styles/Profile.module.css';
import Navbar from '../../components/Navbar';

const UserPage = () => {
  const [userData, setUserData] = useState(null);
  const [userEvents, setUserEvents] = useState([]);

  const { query: { userid } } = useRouter();

  const fetchUserEvents = async (uid) => {
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });   
    setUserEvents(events);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userid) {
          console.log("No user")
          return;
        }
        const docRef = doc(db, "usersProfile", userid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
        } else {
          console.log("No such document!");
        }

        fetchUserEvents(userid);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userid]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { firstname, lastname, occupation, website, image, email } = userData;
  let imageUrl = image;
  let fullname = firstname + ' ' + lastname;
  return (
    <div>
      <Navbar />

      <div className={styles.mainContainer}>
        <div className={styles.profile}>
          <div className={styles.imageContainer}>
            <img
              src={imageUrl}
              alt="Profile Picture"
              className={styles.image}
            />
          </div>
          <div className={styles.textContainer}>
            <h1 className={styles.name}>{fullname}</h1>
            <h2 className={styles.occupation}>{occupation}</h2>
            <div className={styles.contact}>
              <p className={styles.email}>{email}</p>
              <p className={styles.website}>{website}</p>
              <div className={styles.social}>
                {/* Add appropriate social media links for the user */}
              </div>
            </div>
          </div>
        </div>
        {/* EVENTS */}
        <div className={styles.userEvents}>
          {userEvents.map((event) => (
            <div key={event.id} className={styles.event}>
              <h3>{event.title}</h3>
              <p>Author: {event.author}</p>
              <p>Description: {event.description}</p>
              <p>Content: {event.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
