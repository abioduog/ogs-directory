import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../context/AuthUserContext';
import { db } from '../lib/firebase';

import { Container, Row, Col, Button, Form, FormGroup, Input, Alert } from 'reactstrap';

import styles from '../styles/Signup.module.css';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  // Optional error handling
  const [error, setError] = useState(null);

  const { createUserWithEmailAndPassword } = useAuth();

  const onSubmit = event => {
    setError(null)
    if (passwordOne === passwordTwo)
      createUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          console.log("Success. The user is created in firebase");
          const usersProfileRef = db.collection('usersProfile').doc(authUser.user.uid);
          usersProfileRef.set({ uid: authUser.user.uid });
          router.push("/logged_in");
        })
        .catch(error => {
          setError(error.message)
        });
    else
      setError("Password do not match")
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <Container className="text-center" style={{ padding: '40px, 0px', justifyContent: 'center' }}>
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

