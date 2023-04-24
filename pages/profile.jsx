import { useEffect, useState } from "react";
import Link from 'next/link';
import { useAuth } from "../context/AuthUserContext";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref, deleteObject } from "firebase/storage";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, storage } from '../lib/firebase';
import styles from "../styles/Profile.module.css";
import globalStyles from '../styles/global.module.css';
import ProfileNavbar from "../components/ProfileNavbar";
import { FaLinkedin, FaFacebook } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import Modal from "react-modal";
import EditEventForm from "../components/EditEventForm";
import Head from 'next/head'

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const { authUser, loading } = useAuth();
  const [userEvents, setUserEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

          if (data.image) {
            console.log("Image exists");
            const imageRef = ref(storage, `users/${authUser.uid}`);
            const downloadURL = await getDownloadURL(imageRef);
            setImageUrl(downloadURL);
          }
        } else {
          console.log("No such document!");
        }
        if (isMounted) setLoadingUserData(false);

        fetchUserEvents(authUser.uid);
      } catch (error) {
        console.error(error);
        if (isMounted) setLoadingUserData(false);
      }
    };

    fetchUserData();
    return () => {
      isMounted = false;
    };
  }, [authUser]);

  const deleteEvent = async (eventId, imageUrls) => {
    try {
      // Delete the event from Firestore
      const eventRef = doc(db, "events", eventId);
      await deleteDoc(eventRef);

      // Delete the images from Firebase Storage
      if (imageUrls && Array.isArray(imageUrls)) {
        for (const imageUrl of imageUrls) {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        }
      }

      // Update the UI by removing the deleted event
      setUserEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const openEditModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const updateEvent = (updatedEvent) => {
    setUserEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  if (loading || !userData) {
    return <div className={globalStyles.loader}>Loading</div>;
  }

  const createShareableLink = (eventId) => {
    return `${window.location.origin}/sharevent/${eventId}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Text copied to clipboard:", text);
      },
      (err) => {
        console.error("Could not copy text to clipboard:", err);
      }
    );
  };

  const { firstname, lastname, occupation, website, facebook, linkedIn, email, phoneNumber } = userData;
  const fullname = `${firstname} ${lastname}`;

  return (
    <div>
      <Head>
        <title>OGS 88 Portal</title>
      </Head>
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
                  <a href={`https://${linkedIn}`}><FaLinkedin className={globalStyles.iconStyle} /></a>
                  <a href={`https://${facebook}`}><FaFacebook className={globalStyles.iconStyle} /></a>
                </div>
              </div>
            </div>
            <Link href="/add_event">
              <a>
                <button className={globalStyles.button}>Add Memory</button>
              </a>
            </Link>
          </div>
        </div>
        {/* EVENTS */}
        <div className={styles.userEvents}>
          <h2>My Memories</h2>
          {userEvents.map((event) => (
            <div key={event.id} className={styles.event}>
              {Array.isArray(event.imageUrls) ? (
                <div className={styles.eventImageContainer}>
                  <Carousel
                    showArrows
                    showStatus={false}
                    showThumbs={false}
                    verticalSwipe='standard'
                    emulateTouch
                  >
                    {event.imageUrls.map((imageUrl, index) => (
                      <div key={index}>
                        <img src={imageUrl} alt={`${event.title} ${index + 1}`} className={styles.eventImage} />
                      </div>
                    ))}
                  </Carousel>
                </div>
              ) : event.imageUrl ? (
                <div className={styles.eventImageContainer}>
                  <img src={event.imageUrl} alt={event.title} className={styles.eventImage} />
                </div>
              ) : null}

              <h3>{event.title}</h3>
              <p>Author: {event.author}</p>
              <p>Description: {event.description}</p>
              <p>Content: {event.content}</p>
              <button class="bg-black hover:bg-gray-500 text-white py-2 px-4 rounded mr-3" onClick={() => deleteEvent(event.id, event.imageUrls)}>
                Delete
              </button>
              <button class="bg-black hover:bg-gray-500 text-white py-2 px-4 rounded" onClick={() => openEditModal(event)}>
                Edit
              </button>

              <button className="bg-black hover:bg-gray-500 text-white py-2 px-4 rounded ml-3" onClick={() => copyToClipboard(createShareableLink(event.id))}>
              Share
            </button>
            </div>
          ))}
        </div>

      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        contentLabel="Edit Event"
        ariaHideApp={false}
      >
        {selectedEvent && (
          <EditEventForm
            event={selectedEvent}
            closeForm={closeModal}
            updateEvent={updateEvent}
          />
        )}
      </Modal>
    </div>
  );
};

export default Profile;