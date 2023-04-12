import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../lib/firebase';
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

const ImagePreview = ({ defaultImage, selectedImage }) => {
  return (
    <div className={styles.imagePreview}>
      <img
        src={selectedImage || defaultImage}
        alt="Profile Preview"
        className={styles.previewImg}
      />
    </div>
  );
};

const EditProfile = () => {
  const { authUser } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    occupation: '',
    email: '',
    website: '',
    linkedIn: '',
    facebook: '',
  });
  const [success, setSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [defaultImage, setDefaultImage] = useState('https://firebasestorage.googleapis.com/v0/b/ogs-two.appspot.com/o/users%2Fdefault_profile_image.png?alt=media&token=3cfe1e0c-ccb7-46c8-81ec-307c48987878');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, 'usersProfile', authUser.uid);
        const docSnap = await docRef.get();

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData(data);
          setProfileImageUrl(data.image);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (authUser) {
      fetchUserData();
    }
  }, [authUser]);

  useEffect(() => {
    if (profileImage) {
      const objectUrl = URL.createObjectURL(profileImage);
      setProfileImageUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [profileImage]);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setProfileImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Update user information in Firestore
      const userRef = doc(db, 'usersProfile', authUser.uid);
      const updatedData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        occupation: formData.occupation,
        email: formData.email,
        website: formData.website,
        linkedIn: formData.linkedIn,
        facebook: formData.facebook
      };

      // Filter out empty or null values
      const filteredData = Object.fromEntries(
        Object.entries(updatedData).filter(([_, v]) => v != null && v !== "")
      );

      await updateDoc(userRef, filteredData);

      // Update profile image in Firestore Storage
      if (profileImage) {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`users/${authUser.uid}`);

        // Check if an existing image exists and delete it if it does
        try {
          const existingImageUrl = await imageRef.getDownloadURL();
          if (existingImageUrl) {
            await storageRef.child(`users/${authUser.uid}`).delete();
          }
        } catch (error) {
          console.log('No existing image found, creating a new one.');
        }

        // Upload the new profile image
        await imageRef.put(profileImage);
        const downloadURL = await imageRef.getDownloadURL();
        setProfileImageUrl(downloadURL);
        await updateDoc(userRef, { image: downloadURL });
      }

      // Show success message and redirect to profile page
      setSuccess(true);
      setTimeout(() => {
        router.push('/profile');
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  if (!authUser) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.gridContainer}>
      <Row>
        <Col>
          <h2>Edit Profile</h2>
        </Col>
      </Row>
      <div className={styles.container}>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit} className={styles.form}>

              {/* PROFILE PREVIEW */}
              <FormGroup>
                <ImagePreview
                  defaultImage={defaultImage}
                  selectedImage={profileImageUrl}
                />
                {/* <Label for="profileImage">Profile Image</Label> */}
                <label htmlFor="profileImage" className={styles.customFileUpload}>
                  Upload Image
                </label>
                <Input
                  type="file"
                  name="profileImage"
                  id="profileImage"
                  onChange={handleImageChange}
                  className={styles.fileInput}
                />
              </FormGroup>

              <FormGroup>
                <Input
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  placeholder='First Name'
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  placeholder='Last Name'
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="occupation"
                  id="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  placeholder='Occupation'
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='Email'
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="website"
                  id="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder='Website'
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="linkedIn"
                  id="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  placeholder='LinkedIn Url'
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="facebook"
                  id="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  placeholder='Facebook Url'
                />
              </FormGroup>
              <Button type="submit">Save Changes</Button>
              {success && (
                <Alert color="success" className={styles.alert}>
                  Your profile has been updated successfully!
                </Alert>
              )}
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EditProfile;




