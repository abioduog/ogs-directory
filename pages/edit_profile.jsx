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

const EditProfile = () => {
  const { authUser } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    website: '',
    social: '',
  });
  const [success, setSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

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
        email: formData.email,
        website: formData.website,
        social: formData.social,
      };
      await updateDoc(userRef, updatedData);

      // Update profile image in Firestore Storage
      if (profileImage) {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`users/${authUser.uid}`);
        const existingImageUrl = await imageRef.getDownloadURL();
        if (existingImageUrl) {
          await storageRef.child(`users/${authUser.uid}`).delete();
        }
        await imageRef.put(profileImage);
        const downloadURL = await imageRef.getDownloadURL();
        setProfileImageUrl(downloadURL);
        updatedData.image = downloadURL;
        await updateDoc(userRef, updatedData);
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
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.gridContainer}>
      <div className={styles.container}>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="firstname">First Name</Label>
                <Input
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastname">Last Name</Label>
                <Input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="website">Website</Label>
                <Input
                  type="text"
                  name="website"
                  id="website"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="social">Social Media Links</Label>
                <Input
                  type="text"
                  name="social"
                  id="social"
                  value={formData.social}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="profileImage">Profile Image</Label>
                <Input
                  type="file"
                  name="profileImage"
                  id="profileImage"
                  onChange={handleImageChange}
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
}  

export default EditProfile;




