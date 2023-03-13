import React from 'react';
import styles from '../styles/VerticalCard.module.css';

const VerticalCard = ({ fullName, jobDescription, website, email }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.fullName}>{fullName}</h2>
        <p className={styles.jobDescription}>{jobDescription}</p>
        <div className={styles.contact}>
          <a href={website} className={styles.website}>{website}</a>
          <a href={`mailto:${email}`} className={styles.email}>{email}</a>
        </div>
      </div>
    </div>
  );
};

export default VerticalCard;