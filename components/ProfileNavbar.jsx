import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import {
    Collapse,
    Navbar as ReactstrapNavbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import styles from '../styles/Navbar.module.css';
import globalStyles from '../styles/global.module.css';

const ProfileNavbar = () => {
    const router = useRouter();
    const { signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const signOutButton = () => {
        signOut();
        router.push('/');
    };

    const isActive = (pathname) => {
        return router.pathname === pathname ? styles.active : '';
    };

    return (
        <div className={styles.hero}>
            <ReactstrapNavbar className={styles.navbar} dark expand="md" style={{ backgroundColor: 'black' }}>
                <Link href="/members">
                    <a className={`${styles.link} ${styles.noUnderline}`}>
                        <span className={styles.fullLogo}>
                            <img className={styles.imgLogo} src="https://firebasestorage.googleapis.com/v0/b/ogs-two.appspot.com/o/logos%2F8def7e5e-9211-4961-b3ca-d7ce1152e33c.jpg?alt=media&token=471faa86-963d-4bf0-86f7-b4f7858f25ca" alt="" />
                            <NavbarBrand className={styles.whiteText}>OGS 88 Portal</NavbarBrand>
                        </span>
                    </a>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link href="/members">
                                <a className={`${styles.link} ${styles.noUnderline} ${isActive('/members')}`}>
                                    <NavLink className={styles.whiteText}>Home</NavLink>
                                </a>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link href="/events">
                                <a className={`${styles.link} ${styles.noUnderline} ${isActive('/events')}`}>
                                    <NavLink className={styles.whiteText}>Events and Activities</NavLink>
                                </a>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link href="/edit_profile">
                                <a className={`${styles.link} ${styles.noUnderline} ${isActive('/edit_profile')}`}>
                                    <NavLink className={styles.whiteText}>Edit Profile</NavLink>
                                </a>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <NavLink className={styles.link}>
                                <button onClick={signOutButton} className={globalStyles.button}>
                                    Sign out
                                </button>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </ReactstrapNavbar>
        </div>
    );
};

export default ProfileNavbar;

