import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const EditEventForm = ({ event, closeForm, updateEvent }) => {
    const [title, setTitle] = useState(event.title);
    const [author, setAuthor] = useState(event.author);
    const [description, setDescription] = useState(event.description);
    const [content, setContent] = useState(event.content);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedEvent = {
            ...event,
            title,
            author,
            description,
            content,
        };

        try {
            const eventRef = doc(db, "events", event.id);
            await setDoc(eventRef, updatedEvent);
            updateEvent(updatedEvent);
        } catch (error) {
            console.error("Error updating event:", error);
        }

        closeForm();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-5 shadow flex flex-col justify-center space-y-4">
            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />

            <label htmlFor="author">Author</label>
            <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />

            <label htmlFor="description">Description</label>
            <input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
            ></input>

            <label htmlFor="content">Content</label>
            <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md h-40"
            ></textarea>

            <div className="flex space-x-4">
                <button type="submit" className="bg-black hover:bg-gray-400 text-white px-4 py-2 rounded-md">Save</button>
                <button type="button" onClick={closeForm} className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-md">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditEventForm;
