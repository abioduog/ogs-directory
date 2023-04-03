import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';
// import SearchBar from '../components/Searchbar';

const Navbar = () => {
    const router = useRouter();

    const isActive = (pathname) => {
        return router.pathname === pathname ? styles.active : '';
    };

    return (
        <div className={styles.hero}>
            <nav className={styles.navbar}>
                <Link href="/members">
                    <a className={styles.link}>
                        <span className={styles.logo}>OGS 88 Portal</span>
                    </a>
                </Link>
                <ul className={styles.menu}>
                    <li className={styles.menuItem}>
                        <Link href="/members">
                            <a className={`${styles.link} ${isActive('/members')}`}>Home</a>
                        </Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link href="/events">
                            <a className={`${styles.link} ${isActive('/events')}`}>Events and Activites</a>
                        </Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link href="/profile">
                            <a>
                                <button className={styles.button}>Go to Profile</button>
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>

    );
};

export default Navbar;
