import { useState } from 'react';
import { useAuth } from '../context/AuthUserContext';
import { doc, addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import styles from '../styles/EditProfile.module.css';
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
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        content: '',
    });
    const [success, setSuccess] = useState(false);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
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

            await addDoc(collection(db, 'events'), newEvent);
            setSuccess(true);
            setFormData({
                title: '',
                author: '',
                description: '',
                content: '',
            });
        } catch (error) {
            console.error(error);
        }
    };

    if (!authUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.gridContainer}>
            <div className={styles.container}>
                <Row>
                    <Col>
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
