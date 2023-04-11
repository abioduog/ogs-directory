import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Row, Col } from 'reactstrap';
import styles from '.././styles/global.module.css';
import Navbar from '../components/Navbar';
import eventCardStyles from '../styles/Events.module.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Events = () => {
    const { authUser, loading, signOut } = useAuth();
    const router = useRouter();
    const [events, setEvents] = useState([]);

    // Listen for changes on loading and authUser, redirect if needed
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/');
        }
    }, [authUser, loading]);

    // Fetch events from Firestore
    useEffect(() => {
        const fetchEvents = async () => {
            const eventsCollection = collection(db, 'events');
            const eventSnapshot = await getDocs(eventsCollection);
            const eventsList = eventSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setEvents(eventsList);
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <Navbar />
            <div className={styles.body}>
                {loading ? (
                    <Row>
                        <Col>Loading....</Col>
                    </Row>
                ) : (
                    <>
                        <div className={styles.container}>
                            <h2>Events, Activites and Memories</h2>
                            <ul>
                                {events.map((event) => (
                                    <div key={event.id} className={eventCardStyles.card}>
                                        <h3 className={eventCardStyles.title}>{event.title}</h3>
                                        <p className={eventCardStyles.author}>Author: {event.author}</p>
                                        <p className={eventCardStyles.description}>Description: {event.description}</p>
                                        <p className={eventCardStyles.content}>Content: {event.content}</p>
                                    </div>
                                ))}

                                {/* {events.map((event) => (
                                    <div key={event.id} className={eventCardStyles.card} onClick={console.log(event.title)}>
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
                                                            <img src={imageUrl} alt={`${event.title} ${index + 1}`} className={eventCardStyles.eventImage} />
                                                        </div>
                                                    ))}
                                                </Carousel>
                                            </div>
                                        ) : event.imageUrl ? (
                                            <div className={styles.eventImageContainer}>
                                                <img src={event.imageUrl} alt={event.title} className={eventCardStyles.eventImage} />
                                            </div>
                                        ) : null}
                                        <h3>{event.title}</h3>
                                        <p>Author: {event.author}</p>
                                        <p>Description: {event.description}</p>
                                        <p>Content: {event.content}</p>
                                    </div>
                                ))} */}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Events;
