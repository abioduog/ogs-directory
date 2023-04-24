import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import styles from "../../styles/Profile.module.css";
import globalStyles from '../../styles/global.module.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const EventPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchEventData = async () => {
            try {
                const docRef = doc(db, "events", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setEventData(docSnap.data());
                } else {
                    console.log("No such event!");
                }
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        fetchEventData();
    }, [id]);

    if (!eventData) {
        return <div>Loading...</div>;
    }

    const { title, author, description, content, imageUrls } = eventData;

    return (
        <div className={styles.mainContainer}>
            <div className={styles.event}>
                {Array.isArray(imageUrls) && imageUrls.length > 0 ? (
                    <div className={styles.eventImageContainer}>
                        <Carousel
                            showArrows
                            showStatus={false}
                            showThumbs={false}
                            swipeable
                            emulateTouch
                        >
                            {imageUrls.map((imageUrl, index) => (
                                <div key={index}>
                                    <img src={imageUrl} alt={`${title} ${index + 1}`} className={styles.eventImage} />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                ) : null}

                <h3>{title}</h3>
                <p>Author: {author}</p>
                <p>Description: {description}</p>
                <p>Content: {content}</p>
            </div>
        </div>
    );
};

export default EventPage;
