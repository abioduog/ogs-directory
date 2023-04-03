import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';

import {Row, Col } from 'reactstrap';

import UsersProfile from '../components/Users';
import styles from '.././styles/global.module.css';
import Navbar from '../components/Navbar';

const Members = () => {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])

  return (
    <div>
      <Navbar />
      <div className={styles.body}>
        {loading ? (
          <Row>
            <Col>Loading....</Col>
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
  )
}

export default Members;

