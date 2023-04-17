import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head'


import { useAuth } from '../context/AuthUserContext';

import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from '../styles/Signup.module.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log("Success. The user is logged in with firebase");
        router.push('/members');
        setSubmitting(false);
      })
      .catch((error) => {
        setError(error.message);
        setSubmitting(false);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>OGS 88 Portal</title>
      </Head>
      <Container className="text-center" style={{ padding: '40px 0px' }}>
        <Row>
          <Col>
            <h2>Login</h2>
          </Col>
        </Row>
        <Row style={{ maxWidth: '300px', margin: 'auto' }}>
          <Col>
            <Form
              style={{
                maxWidth: '300px',
                // margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f2f2f2',
                padding: '40px',
                borderRadius: '5px',
              }}
              onSubmit={onSubmit}
            >
              {error && <Alert color="danger">{error}</Alert>}
              <FormGroup row>
                <Col sm={20}>
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    id="loginEmail"
                    placeholder="Email"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={20}>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    id="loginPassword"
                    placeholder="Password"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Button disabled={submitting}>Login</Button>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  No account? <Link href="/sign_up">Create one</Link>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

