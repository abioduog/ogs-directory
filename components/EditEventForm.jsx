// components/EditEventForm.js
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

import styles from "../styles/EditEventForm.module.css";

const EditEventForm = ({ event, closeForm, updateEvent }) => {
    const [title, setTitle] = useState(event.title);
    const [author, setAuthor] = useState(event.author);
    const [description, setDescription] = useState(event.description);
    const [content, setContent] = useState(event.content);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Update the event data
        const updatedEvent = {
            ...event,
            title,
            author,
            description,
            content,
        };

        // Update the event in Firestore
        try {
            const eventRef = doc(db, "events", event.id);
            await setDoc(eventRef, updatedEvent);
            updateEvent(updatedEvent);
        } catch (error) {
            console.error("Error updating event:", error);
        }

        // Close the modal
        closeForm();
    };


    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="title" className={styles.label}>Title</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
            />

            <label htmlFor="author" className={styles.label}>Author</label>
            <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={styles.input}
            />

            <label htmlFor="description" className={styles.label}>Description</label>
            <input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.input}
            ></input>

            <label htmlFor="content" className={styles.label}>Content</label>
            <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={styles.textarea}
            ></textarea>

            <div className={styles.buttons}>
                <button type="submit" className={styles.saveButton}>Save</button>
                <button type="button" onClick={closeForm} className={styles.cancelButton}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditEventForm;