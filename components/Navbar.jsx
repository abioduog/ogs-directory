import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

const Navbar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const isActive = (pathname) => {
        return router.pathname === pathname ? styles.active : '';
    };

    return (
        <div className={styles.hero}>
            <ReactstrapNavbar className={styles.navbar} dark expand="md" style={{ backgroundColor: 'black' }}>
                <Link href="/members">
                    <a className={styles.link}>
                        <NavbarBrand className={styles.whiteText}>OGS 88 Portal</NavbarBrand>
                    </a>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link href="/members">
                                <a className={`${styles.link} ${isActive('/members')}`}>
                                    <NavLink className={styles.whiteText}>Home</NavLink>
                                </a>
                            </Link>
                        </NavItem>
                        
                        <NavItem>
                            <Link href="/events">
                                <a className={`${styles.link} ${isActive('/events')}`}>
                                    <NavLink className={styles.whiteText}>Events and Activities</NavLink>
                                </a>
                            </Link>
                        </NavItem>

                        <NavItem>
                            <Link href="/profile">
                                <a>
                                    <NavLink className={styles.link}>
                                        <button className={`${globalStyles.button} ${styles.whiteButton}`}>
                                            Go to Profile
                                        </button>
                                    </NavLink>
                                </a>
                            </Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </ReactstrapNavbar>
        </div>
    );
};

export default Navbar;
