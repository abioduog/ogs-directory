import { useState } from 'react';
import { useAuth } from '../context/AuthUserContext';
import { doc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { db, storage } from '../lib/firebase';
import styles from '../styles/EditProfile.module.css';
import globalStyles from '../styles/global.module.css';
import { useRouter } from 'next/router';
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
} from 'reactstrap';


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
    const [eventImage, setEventImage] = useState(null);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleImageChange = (event) => {
        if (event.target.files[0]) {
            setEventImage(event.target.files[0]);
        }
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

            if (eventImage) {
                const storageRef = storage.ref();
                const imageRef = storageRef.child(`memories/${docRef.id}`);

                await imageRef.put(eventImage);
                const downloadURL = await imageRef.getDownloadURL();

                await updateDoc(doc(db, 'events', docRef.id), { imageUrl: downloadURL });
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
        return <div className={globalStyles}>Loading...</div>;
    }

    return (
        <div className={styles.gridContainer}>
            <div className={styles.container}>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <h2>Add Memory</h2>
                            </Col>
                        </Row>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="title">Event Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
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
                                    value={formData.content}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="eventImage">Event Image</Label>
                                <Input
                                    type="file"
                                    name="eventImage"
                                    id="eventImage"
                                    onChange={handleImageChange}
                                />
                            </FormGroup>
                            <Button type="submit">Add Event</Button>
                            {success && (
                                <Alert color="success" className="mt-3">
                                    Your event has been added successfully!
                                </Alert>
                            )}
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default AddEvent;
