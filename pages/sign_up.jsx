import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../context/AuthUserContext';
import { db } from '../lib/firebase';

import { Container, Row, Col, Button, Form, FormGroup, Input, Alert } from 'reactstrap';

import styles from '../styles/Signup.module.css';

const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [occupation, setOccupation] = useState("");
  const [website, setWebsite] = useState("");
  const [social, setSocial] = useState("");

  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  // Optional error handling
  const [error, setError] = useState(null);

  const { createUserWithEmailAndPassword } = useAuth();

  const onSubmit = event => {
    setError(null)
    if (passwordOne === passwordTwo) {
      createUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          console.log("Success. The user is created in firebase");
          const usersProfileRef = db.collection('usersProfile').doc(authUser.user.uid);
          usersProfileRef.set({
            uid: authUser.user.uid,
            email: authUser.user.email,
            firstname,
            lastname,
            occupation,
            website,
            social,
            image: 'https://firebasestorage.googleapis.com/v0/b/ogs-two.appspot.com/o/users%2Fdefault_profile_image.jpg?alt=media&token=b8c349c8-c952-4f69-8506-2c75d725fcaf' // Set an empty string as the default image value
          });
          router.push("/members");
        })
        .catch(error => {
          setError(error.message)
        });
    } else
      setError("Password do not match")
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <Container className="text-center" style={{ padding: '40px, 0px', justifyContent: 'center' }}>
        <Row>
          <Col>
            <h2>Sign Up</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form style={{
              maxWidth: '400px',
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }} onSubmit={onSubmit}>
              {error && <Alert color="danger">{error}</Alert>}
              <FormGroup row>
                <Col sm={20}>
                  <Input
                    type="text"
                    value={firstname}
                    onChange={(event) => setFirstname(event.target.value)}
                    name="firstname"
                    id="signUpFirstName"
                    placeholder="First Name" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={20}>
                  <Input
                    type="text"
                    value={lastname}
                    onChange={(event) => setLastname(event.target.value)}
                    name="lastname"
                    id="signUpLastName"
                    placeholder="Last Name" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={20}>
                  <Input
                    type="text"
                    value={occupation}
                    onChange={(event) => setOccupation(event.target.value)}
                    name="occupation"
                    id="signUpOccupation"
                    placeholder="Occupation" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={20}>
                  <Input
                    type="text"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                    name="website"
                    id="signUpWebsite"
                    placeholder="Website" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={20}>
                  <Input
                    type="text"
                    value={social}
                    onChange={(event) => setSocial(event.target.value)}
                    name="social"
                    id="signUpSocial"
                    placeholder="Social Media URL" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={20}>
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    id="signUpEmail"
                    placeholder="Email" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={20}>
                  <Input
                    type="password"
                    name="passwordOne"
                    value={passwordOne}
                    onChange={(event) => setPasswordOne(event.target.value)}
                    id="signUpPassword"
                    placeholder="Password" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={20}>
                  <Input
                    type="password"
                    name="password"
                    value={passwordTwo}
                    onChange={(event) => setPasswordTwo(event.target.value)}
                    id="signUpPassword2"
                    placeholder="Confirm Password" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Button>Sign Up</Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SignUp;

