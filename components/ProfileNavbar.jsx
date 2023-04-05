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
    Button,
} from 'reactstrap';
import styles from '../styles/Navbar.module.css';

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
                        <NavbarBrand className={styles.whiteText}>OGS 88 Portal</NavbarBrand>
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
                                <Button onClick={signOutButton} className={styles.whiteButton}>Sign out</Button>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </ReactstrapNavbar>
        </div>
    );
};

export default ProfileNavbar;

