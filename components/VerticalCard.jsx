import React from 'react';
import styles from '../styles/VerticalCard.module.css';
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaBeer } from 'react-icons/fa';

const VerticalCard = ({
  imageSrc,
  fullName,
  jobDescription,
  website,
  email,
}) => {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img src={imageSrc} alt={fullName} className={styles.squareImage} />
        </div>
        <div className={styles.content}>
          <h2 className={styles.fullName}>{fullName}</h2>
          <p className={styles.jobDescription}>{jobDescription}</p>
          <div className={styles.contact}>
          
            <AiOutlineLinkedin />
            <FaBeer />
            <a href={website} className={styles.website}>
              {website}
            </a>
            <a href={`mailto:${email}`} className={styles.email}>
              {email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalCard;
