import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';

import { Container, Row, Col, Button } from 'reactstrap';

import UsersProfile from '../components/Users';
import styles from '.././styles/global.module.css';
import Navbar from '../components/Navbar';
import SearchBar from '../components/Searchbar';

const LoggedIn = () => {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

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
            <SearchBar handleSearch={handleSearch} />
            <UsersProfile searchQuery={searchQuery} />
          </div>
        </>
      )}
    </div>
    </div>
  )
}

export default LoggedIn;

