import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../lib/firebase';
import styles from '../styles/EditProfile.module.css';
import Head from 'next/head';
import ReactModal from 'react-modal';

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Alert,
} from 'reactstrap';

const ImagePreview = ({ defaultImage, selectedImage }) => {
  return (
    
    <div className={styles.imagePreview}>
      <Head>
        <title>OGS 88 Portal</title>
      </Head>
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
    middlename: '',
    lastname: '',
    occupation: '',
    email: '',
    website: '',
    linkedIn: '',
    facebook: '',
    currentLocationState: '',
    currentLocationCountry: '',
    oneSentenceDescription: '',
    nickname: '',
    careerAspiration: '',
    advice: ''
  });
  const [success, setSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [defaultImage, setDefaultImage] = useState('https://firebasestorage.googleapis.com/v0/b/ogs-two.appspot.com/o/users%2Fdefault_profile_image.png?alt=media&token=3cfe1e0c-ccb7-46c8-81ec-307c48987878');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
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


  const closeModal = () => {
    setModalIsOpen(false);
    router.push('/profile');
  };

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
        middlename: formData.middlename,
        lastname: formData.lastname,
        occupation: formData.occupation,
        email: formData.email,
        website: formData.website,
        linkedIn: formData.linkedIn,
        facebook: formData.facebook,
        currentLocationState: formData.currentLocationState,
        currentLocationCountry: formData.currentLocationCountry,
        oneSentenceDescription: formData.oneSentenceDescription,
        nickname: formData.nickname,
        careerAspiration: formData.careerAspiration,
        advice: formData.advice
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
      // setSuccess(true);

      // Show success message and open the modal
      setSuccess(true);
      setModalIsOpen(true);

      // setTimeout(() => {
      //   router.push('/profile');
      // }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  if (!authUser) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.container}>

      {/* Add this line to set the app element for the modal */}
      {ReactModal.setAppElement('#__next')}

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Profile Updated Modal"
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
      >
        <h2>Profile Updated</h2>
        <p>Your profile has been updated successfully!</p>
        <Button onClick={closeModal} className="bg-black text-white px-4 py-2 rounded-md">Close</Button>
      </ReactModal>
      <div>

      </div>

      <div className={styles.gridContainer}>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit} className={styles.form}>
            <h2>Edit Profile</h2>

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
                
                {/* TEXT INPUT SECTION */}
                <Input
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  placeholder='First Name'
                  className={styles.input}
                />

                <Input
                  type="text"
                  name="middlename"
                  id="middlename"
                  value={formData.middlename}
                  onChange={handleInputChange}
                  placeholder='Middle Name'
                  className={styles.input}
                />


                <Input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  placeholder='Last Name'
                  className={styles.input}
                />

                <Input
                  type="text"
                  name="nickname"
                  id="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  placeholder='Nickname at school'
                  className={styles.input}
                />

                <Input
                  type="text"
                  name="occupation"
                  id="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  placeholder='Occupation'
                  className={styles.input}
                />

                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='Email'
                  className={styles.input}
                />

                <Input
                  type="text"
                  name="website"
                  id="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder='Website'
                  className={styles.input}
                />

                <Input
                  type="text"
                  name="linkedIn"
                  id="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  placeholder='LinkedIn Url'
                  className={styles.input}
                />

                <Input
                  type="text"
                  name="facebook"
                  id="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  placeholder='Facebook Url'
                  className={styles.input}
                />

                <Input
                  type="text"
                  name="currentLocationState"
                  id="currentLocationState"
                  value={formData.currentLocationState}
                  onChange={handleInputChange}
                  placeholder='Current Location (State)'
                  className={styles.input}
                />

                <Input
                  type="text"
                  name="currentLocationCountry"
                  id="currentLocationCountry"
                  value={formData.currentLocationCountry}
                  onChange={handleInputChange}
                  placeholder='Current Location (Country)'
                  className={styles.input}
                />

                <Input
                  type="text"
                  name="oneSentenceDescription"
                  id="oneSentenceDescription"
                  value={formData.oneSentenceDescription}
                  onChange={handleInputChange}
                  placeholder='Describe yourself in one sentence'
                  className={styles.input}
                />

                <Input
                  type="text"
                  name="careerAspiration"
                  id="careerAspiration"
                  value={formData.careerAspiration}
                  onChange={handleInputChange}
                  placeholder='Career aspiration for the next 5 years'
                  className={styles.input}
                />

                <Input
                  type="text"
                  name="advice"
                  id="advice"
                  value={formData.advice}
                  onChange={handleInputChange}
                  placeholder='Word of advice to your classmates'
                  className={styles.input}
                />

              <Button type="submit" className="bg-black text-white px-4 py-2 rounded-md">Save Changes</Button>
              {success && (
                <Alert color="success" className={styles.alert}>
                  Your profile has been updated successfully!
                </Alert>
              )}
            </Form>
          </Col>
        </Row>
      </div>

      <div>
        
      </div>


    </div>
  );
};

export default EditProfile;




