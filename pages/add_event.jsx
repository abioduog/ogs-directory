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
    const [eventImages, setEventImages] = useState([]);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleImageChange = (event) => {
        if (event.target.files.length > 0) {
            setEventImages(Array.from(event.target.files));
        }
    };

    const isFormValid = () => {
        return (
            formData.title.trim() !== '' &&
            formData.author.trim() !== '' &&
            formData.description.trim() !== '' &&
            formData.content.trim() !== ''
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
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder='Enter Memory Title'
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="author"
                                    id="author"
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    placeholder='Enter Author Name'
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="description"
                                    id="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder='Enter Memory Description'
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="textarea"
                                    name="content"
                                    id="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    placeholder='Enter Content Here'
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="eventImages">Add Images (Optional)</Label>
                                <Input
                                    type="file"
                                    name="eventImages"
                                    id="eventImages"
                                    onChange={handleImageChange}
                                    multiple
                                />
                            </FormGroup>
                            <Button type="submit" disabled={!isFormValid()}>Upload</Button>
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
