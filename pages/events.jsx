// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { useAuth } from '../context/AuthUserContext';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../lib/firebase';
// import { Row, Col } from 'reactstrap';
// import styles from '.././styles/global.module.css';
// import Navbar from '../components/Navbar';
// import eventCardStyles from '../styles/Events.module.css';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import Head from 'next/head'

// const Events = () => {
//     const { authUser, loading} = useAuth();
//     const router = useRouter();
//     const [events, setEvents] = useState([]);

//     // Listen for changes on loading and authUser, redirect if needed
//     useEffect(() => {
//         if (!loading && !authUser) {
//             router.push('/');
//         }
//     }, [authUser, loading]);

//     // Fetch events from Firestore
//     useEffect(() => {
//         const fetchEvents = async () => {
//             const eventsCollection = collection(db, 'events');
//             const eventSnapshot = await getDocs(eventsCollection);
//             const eventsList = eventSnapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             }));
//             setEvents(eventsList);
//         };

//         fetchEvents();
//     }, []);

//     return (
//         <div>
//             <Head>
//                 <title>OGS 88 Portal</title>
//             </Head>
//             <Navbar />
//             <div className={styles.body}>
//                 {loading ? (
//                     <Row>
//                         <Col>Loading</Col>
//                     </Row>
//                 ) : (
//                     <>
//                         <div className={styles.container}>
//                             <h2 className=''>Events, Activites and Memories</h2>
//                             <ul>
//                                 {events.map((event) => (
//                                     <div key={event.id} className={eventCardStyles.card}>
//                                         <h3 className={eventCardStyles.title}>{event.title}</h3>
//                                         <p className={eventCardStyles.author}>Author: {event.author}</p>
//                                         <p className={eventCardStyles.description}>Description: {event.description}</p>
//                                         <p className={eventCardStyles.content}>Content: {event.content}</p>
//                                     </div>
//                                 ))}
//                             </ul>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Events;



import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Row, Col } from 'reactstrap';
import Navbar from '../components/Navbar';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Head from 'next/head'

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
            <Head>
                <title>OGS 88 Portal</title>
            </Head>
            <Navbar />
            <div className="bg-gray-100">
                {loading ? (
                    <Row>
                        <Col>Loading</Col>
                    </Row>
                ) : (
                    <>
                        <div className="container mx-auto">
                            <div className="flex flex-col justify-center items-center">
                                <h2 className="text-4xl font-bold mb-4 pt-28">Events, Activities, and Memories</h2>
                                <ul>
                                    {events.map((event) => (
                                        <div key={event.id} className="bg-white shadow-1 p-4 mb-4 rounded">
                                            <h3 className="text-4xl font-semibold mb-2">{event.title}</h3>
                                            <p className="text-gray-600 text-2xl mb-1">Author: {event.author}</p>
                                            <p className="text-gray-600 mb-1">Description: {event.description}</p>
                                            <p className="text-gray-600 mb-1">Content: {event.content}</p>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Events;

