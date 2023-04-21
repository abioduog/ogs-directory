import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head'


import { useAuth } from '../context/AuthUserContext';

import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <Head>
        <title>OGS 88 Portal</title>
      </Head>
      <div className="py-20">
        <div className="justify-center">
          <div>
            <h2 className="uppercase text-center text-xl font-bold">Login</h2>
          </div>
        </div>
        <div className="max-w-xs mx-auto shadow">
          <div>
            <div
              className="flex flex-col items-center bg-white p-10 rounded-md"
              onSubmit={onSubmit}
            >
              {error && <Alert color="danger">{error}</Alert>}
              <div>
                <Col sm={20}>
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    id="loginEmail"
                    placeholder="Email"
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                  />
                </Col>
              </div>
              <FormGroup row>
                <Col sm={20}>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    id="loginPassword"
                    placeholder="Password"
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Button className="w-full px-4 py-2 mb-4 bg-black text-white rounded-md" onClick={onSubmit}>
                    Login
                  </Button>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  No account?{' '}
                  <Link href="/sign_up">
                    <a className="text-blue-500 hover:underline">Create one</a>
                  </Link>
                </Col>
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

