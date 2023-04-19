import { useState } from 'react';
import { useAuth } from '../context/AuthUserContext';
import { doc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { db, storage } from '../lib/firebase';
import styles from '../styles/AddEvent.module.css';
import globalStyles from '../styles/global.module.css';
import { useRouter } from 'next/router';
import Head from 'next/head'
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
} from 'reactstrap';

const ImagePreview = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const onExiting = () => {
        setAnimating(true);
    };

    const onExited = () => {
        setAnimating(false);
    };

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = images.map((image, index) => {
        return (
            <CarouselItem
                onExiting={onExiting}
                onExited={onExited}
                key={index}
            >
                <div className={styles.memoryImagePreview}>
                    <img
                        src={image}
                        alt={`Image Preview ${index + 1}`}
                        className={styles.memoryPreviewImg}
                    />
                </div>
            </CarouselItem>
        );
    });

    return (
        <div className="carouselContainer">
            <Head>
                <title>OGS 88 Portal</title>
            </Head>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators
                    items={images}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                />
                {slides}
                <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={previous}
                />
                <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={next}
                />
            </Carousel>
        </div>
    );

};

const AddEvent = () => {
    const { authUser } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        content: '',
    });
    const [success, setSuccess] = useState(false);
    const [eventImages, setEventImages] = useState([]);
    const [eventImagePreviews, setEventImagePreviews] = useState([]);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleImageChange = (event) => {
        if (event.target.files.length > 0) {
            setEventImages(Array.from(event.target.files));
            const imagePreviews = Array.from(event.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            setEventImagePreviews(imagePreviews);
        }
    };

    const isFormValid = () => {
        return (
            formData.title.trim() !== '' &&
            formData.author.trim() !== '' &&
            formData.description.trim() !== '' && formData.content.trim() !== ''
        );

    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const newEvent = {
                uid: authUser.uid,
                title: formData.title,
                author: formData.author,
                description: formData.description,
                content: formData.content,
            };

            const docRef = await addDoc(collection(db, 'events'), newEvent);

            if (eventImages.length > 0) {
                const storageRef = storage.ref();
                const imageUrls = [];

                for (const image of eventImages) {
                    const imageRef = storageRef.child(`memories/${docRef.id}/${image.name}`);

                    await imageRef.put(image);
                    const downloadURL = await imageRef.getDownloadURL();
                    imageUrls.push(downloadURL);
                }

                await updateDoc(doc(db, 'events', docRef.id), { imageUrls });
            }

            setSuccess(true);
            setFormData({
                title: '',
                author: '',
                description: '',
                content: '',
            });
            router.push('/profile');
        } catch (error) {
            console.error(error);
        }
    };

    if (!authUser) {
        return <div className={globalStyles.loader}>Loading</div>;
    }

    return (
        <div>
            <div className={styles.gridContainer}>
                <div className={styles.container}>
                <h2>Add Memory</h2>
                <ImagePreview images={eventImagePreviews} />
                    <Row>
                        <Col>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Input
                                        type="file"
                                        name="eventImages"
                                        id="eventImages"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Event title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="author">Author</Label>
                                    <Input
                                        type="text"
                                        name="author"
                                        id="author"
                                        placeholder="Author name"
                                        value={formData.author}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input
                                        type="textarea"
                                        name="description"
                                        id="description"
                                        placeholder="Event description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="content">Content</Label>
                                    <Input
                                        type="textarea"
                                        name="content"
                                        id="content"
                                        placeholder="Event content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                                <Button
                                    color="primary"
                                    type="submit"
                                    disabled={!isFormValid()}
                                >
                                    Add Memory
                                </Button>
                                {success && (
                                    <Alert color="success" className="mt-3">
                                        Memory added successfully!
                                    </Alert>
                                )}
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>

    );
};

export default AddEvent;      
