import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';

import { Row, Col } from 'reactstrap';

import UsersProfile from '../components/Users';
import styles from '.././styles/global.module.css';
import Navbar from '../components/Navbar';
import Head from 'next/head'

const Members = () => {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

  // New state variable for tracking authentication status
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/');
    } else if (!loading && authUser) { 
      setIsAuthenticating(false);
    }
  }, [authUser, loading]);

  return (
    <div>
      <Head>
        <title>OGS 88 Portal</title>
      </Head>
      <Navbar />
      <div className={styles.body}>
        {isAuthenticating ? (
          <Row>
            <Col className={styles.loader}>Loading</Col>
          </Row>
        ) : (
          <>
            <div className={styles.container}>
              <UsersProfile />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Members;


