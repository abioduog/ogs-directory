import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import styles from '../styles/AddProfile.module.css';

const AddProfile = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    occupation: '',
    email: '',
    phone: '',
    website: '',
    social: '',
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = doc(db, 'usersProfile', formData.email);
      await setDoc(docRef, {
        firstname: formData.firstname,
        lastname: formData.lastname,
        occupation: formData.occupation,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        social: formData.social,
      });
      console.log('Document successfully written!');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  return (
    <form className={styles.addProfile} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Add Profile</h1>
      <label className={styles.label}>
        First Name
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleInputChange}
          required
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Last Name
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
          required
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Occupation
        <input
          type="text"
          name="occupation"
          value={formData.occupation}
          onChange={handleInputChange}
          required
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Email
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Phone Number
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Website
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          required
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Social Media Links
        <input
          type="text"
          name="social"
          value={formData.social}
          onChange={handleInputChange}
          required
          className={styles.input}
        />
      </label>
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
};

export default AddProfile;
