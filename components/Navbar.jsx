// import React from 'react';
// import styles from '../styles/Navbar.module.css';

// const Navbar = () => {
//   return (
//     <div class={styles.hero}>
//     <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease"
//       role="banner" class="navbar w-nav">
//       <div class="div-block-89"><a href="index.html" class="brand w-nav-brand">
//         <img src="../uploads-ssl.webflow.com/5e3560ac9615a2309b6fb86c/5ea829f35aa9d9b8758cde78_10KDESIGNERS.png"
//             width="160" alt="" class="image-14" /></a>
//         <nav role="navigation" class={styles.navMenu}>
//           <div class={styles.divBlock88}><a href="index.html" class={styles.demo}>Home</a></div>
//           <div class={styles.divBlock88}><a href="members.html" aria-current="page"
//               class="nav-link-4 w-nav-link w--current">Members</a></div>
//           <div class={styles.divBlock88}><a href="case-studies.html" class="nav-link-4 w-nav-link">Events and Activites</a></div>
//         </nav>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Navbar;

import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
    const router = useRouter();

    const isActive = (pathname) => {
        return router.pathname === pathname ? styles.active : '';
    };

    return (
        <div className={styles.hero}>
            <nav className={styles.navbar}>
                <Link href="/logged_in">
                    <a className={styles.link}>
                        <span className={styles.logo}>OGS Directory</span>
                    </a>
                </Link>
                <ul className={styles.menu}>
                    <li className={styles.menuItem}>
                        <Link href="/logged_in">
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
                                <button>Go to Profile</button>
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>

    );
};

export default Navbar;
