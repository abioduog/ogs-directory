import React from 'react'
import Link from 'next/link'

import cardstyles from '../styles/VerticalCard.module.css';
import { FaLinkedin, FaFacebook } from 'react-icons/fa';
let linkedIn = 'https://www.linkedin.com/in/andrew-lee-0b0b3b1b3/'
let facebook = 'https://www.facebook.com/andrew.lee.581'


const UserProfileCard = ({ firstname, lastname, id, occupation, website, email, imgUrl }) => {
	let fullName = firstname + ' ' + lastname
	let imageUrl = imgUrl
	return (
		<div>
			<div className={cardstyles.card}>
				<div className={cardstyles.content}>
					<Link href={`/user/${id}`}>
						<div className={cardstyles.imageContainer}>
							<img src={imageUrl} alt={fullName} className={cardstyles.image} />
						</div>
					</Link>
					<div className={cardstyles.textContent}>
						<h2 className={cardstyles.fullName}>{fullName}</h2>
						<p className={cardstyles.jobDescription}>{occupation}</p>
						<div className={cardstyles.contact}>
							<a href={website} className={cardstyles.website}>{website}</a>
							<a href={`mailto:${email}`} className={cardstyles.email}>{email}</a>
							<div className={cardstyles.social}>
								<a href={linkedIn}><FaLinkedin className={cardstyles.iconStyle} /></a>
								<a href={facebook}><FaFacebook className={cardstyles.iconStyle} /></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	)
}

export default UserProfileCard

