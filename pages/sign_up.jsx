import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../context/AuthUserContext';
import { db } from '../lib/firebase';

import { Container, Row, Col, Button, Form, FormGroup, Input, Alert } from 'reactstrap';

const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [occupation, setOccupation] = useState("");
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedIn, setLinkedin] = useState("");
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
            linkedIn: linkedIn,
            facebook,
            image: 'https://firebasestorage.googleapis.com/v0/b/ogs-two.appspot.com/o/users%2Fdefault_profile_image.png?alt=media&token=3cfe1e0c-ccb7-46c8-81ec-307c48987878' // Set an empty string as the default image value
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
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="text-center py-10">
        <Row className="justify-center">
          <Col>
            <h2 className="text-xl font-bold uppercase">Sign Up</h2>
          </Col>
        </Row>
        <div className="justify-center">
          <Col>
            <Form className="bg-white p-5 shadow flex flex-col justify-center items-center" onSubmit={onSubmit}>
              {error && <Alert color="danger">{error}</Alert>}
              <FormGroup row className="mb-4">
                <Col sm={20}>
                  <Input
                    type="text"
                    value={firstname}
                    onChange={(event) => setFirstname(event.target.value)}
                    name="firstname"
                    id="signUpFirstName"
                    placeholder="First Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="mb-4">
                <Col sm={20}>
                  <Input
                    type="text"
                    value={lastname}
                    onChange={(event) => setLastname(event.target.value)}
                    name="lastname"
                    id="signUpLastName"
                    placeholder="Last Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="mb-4">
                <Col sm={20}>
                  <Input
                    type="text"
                    value={occupation}
                    onChange={(event) => setOccupation(event.target.value)}
                    name="occupation"
                    id="signUpOccupation"
                    placeholder="Occupation"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="mb-4">
                <Col sm={20}>
                  <Input
                    type="text"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                    name="website"
                    id="signUpWebsite"
                    placeholder="Website"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="mb-4">
                <Col sm={20}>
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    id="signUpEmail"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="mb-4">
                <Col sm={20}>
                  <Input
                    type="text"
                    value={facebook}
                    onChange={(event) => setFacebook(event.target.value)}
                    name="facebook"
                    id="signUpFacebook"
                    placeholder="Facebook URL"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="mb-4">
                <Col sm={20}>
                  <Input
                    type="text"
                    value={linkedIn}
                    onChange={(event) => setLinkedin(event.target.value)}
                    name="linkedIn"
                    id="signUpLinkedIn"
                    placeholder="LinkedIn URL"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row className="mb-4">
                    <Col sm={20}>
                      <Input
                        type="password"
                        name="passwordOne"
                        value={passwordOne}
                        onChange={(event) => setPasswordOne(event.target.value)}
                        id="signUpPassword"
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row className="mb-4">
                    <Col sm={20}>
                      <Input
                        type="password"
                        name="password"
                        value={passwordTwo}
                        onChange={(event) => setPasswordTwo(event.target.value)}
                        id="signUpPassword2"
                        placeholder="Confirm Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col>
                      <Button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-md"
                      >
                        Sign Up
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </Col>
            </div>
          </div>
        </div>
        

  )
}

export default SignUp;

