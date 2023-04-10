import { useEffect, useState } from "react";
import Link from 'next/link';
import { useAuth } from "../context/AuthUserContext";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, storage } from '../lib/firebase';
import styles from "../styles/Profile.module.css";
import globalStyles from '../styles/global.module.css';
import ProfileNavbar from "../components/ProfileNavbar";
import { FaLinkedin, FaFacebook } from 'react-icons/fa';


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const { authUser, loading } = useAuth();
  const [userEvents, setUserEvents] = useState([]);
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
    let isMounted = true;
    const fetchUserData = async () => {
      try {
        if (isMounted) setLoadingUserData(true);
        if (!authUser) {
          if (isMounted) setLoadingUserData(false);
          return;
        }
        const docRef = doc(db, "usersProfile", authUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);

          // Check if the authenticated user ID matches a filename in Firestore storage
          const userId = authUser.uid;
          if (data.image) {
            console.log("Image exists");
            const imageRef = ref(storage, `users/${userId}`);
            const downloadURL = await getDownloadURL(imageRef);
            setImageUrl(downloadURL);
          }
        } else {
          console.log("No such document!");
        }
        if (isMounted) setLoadingUserData(false);

        // Call the fetchUserEvents function after the user data is fetched
        fetchUserEvents(authUser.uid);
      } catch (error) {
        console.error(error);
        if (isMounted) setLoadingUserData(false);
      }
    };

    fetchUserData();
    return () => {
      isMounted = false; // Add this line
    };
  }, [authUser]);


  if (loading || !userData) {
    return <div className={globalStyles.loader}>Loading
    </div>;

  }

  const { firstname, lastname, occupation, website, email, phoneNumber } = userData;
  const fullname = `${firstname} ${lastname}`;

  return (
    <div>
      <ProfileNavbar />
      <div className={styles.mainContainer}>
        <div className={styles.profile}>
          <div className={styles.imageContainer}>
            {imageUrl ? (
              <img src={imageUrl} alt={fullname} className={styles.image} />
            ) : (
              <div className={styles.noImage}> {fullname} </div>
            )}
          </div>
          <div className={styles.textContainer}>
            <h1 className={styles.name}>{fullname}</h1>
            <h2 className={styles.occupation}>{occupation}</h2>
            <div className={styles.contact}>
              <p className={styles.email}>{email}</p>
              <p className={styles.phoneNumber}>{phoneNumber}</p>
              <p className={styles.website}>{website}</p>
              <div className={styles.social}>
                <div className={styles.social}>
                  <a href={''}><FaLinkedin className={globalStyles.iconStyle} /></a>
                  <a href={''}><FaFacebook className={globalStyles.iconStyle} /></a>
                </div>
              </div>
            </div>
            <Link href="/add_event">
              <a>
                <button className={globalStyles.button}>Add Memeory</button>
              </a>
            </Link>
          </div>
        </div>
        {/* EVENTS */}
        <div className={styles.userEvents}>
          <h2>My Memories</h2>
          {/* {userEvents.map((event) => (
            <div key={event.id} className={styles.event}>
              <div className={styles.eventImageContainer}>
                <img src={event.imageUrl} alt={event.title} className={styles.eventImage} />
              </div>
              <h3>{event.title}</h3>
              <p>Author: {event.author}</p>
              <p>Description: {event.description}</p>
              <p>Content: {event.content}</p>
            </div>
          ))} */}

          {/* {userEvents.map((event) => (
            <div key={event.id} className={styles.event}>
              <div className={styles.eventImageContainer}>
                {event.imageUrl ? (
                  <img src={event.imageUrl} alt={event.title} className={styles.eventImage} />
                ) : null}
              </div>
              <h3>{event.title}</h3>
              <p>Author: {event.author}</p>
              <p>Description: {event.description}</p>
              <p>Content: {event.content}</p>
            </div>
          ))} */}

          {userEvents.map((event) => (
            <div key={event.id} className={styles.event}>
              {event.imageUrl && (
                <div className={styles.eventImageContainer}>
                  <img src={event.imageUrl} alt={event.title} className={styles.eventImage} />
                </div>
              )}
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
}

export default Profile;