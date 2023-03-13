import React from 'react'
import Link from 'next/link'

// import { VStack, Heading} from '@chakra-ui/react'
// import { Card, CardHeader, CardBody, CardFooter, Stack, StackDivider, Button } from '@chakra-ui/react'

import cardstyles from '../styles/VerticalCard.module.css';


const UserProfileCard = ({ firstname, lastname, id, occupation, website, email, imgUrl }) => {
	let fullName = firstname + ' ' + lastname
	// let imageUrl = 'https://firebasestorage.googleapis.com/v0/b/ogs-two.appspot.com/o/360_F_448593569_kOEPextTZPc2rEZnlq7E3eXPF5Bb2XSU.jpg?alt=media&token=9831e520-727e-474d-9571-a2b77f4a1d2c'
	let imageUrl = imgUrl
	return (
		<div>
			<Link href={`/user/${id}`}>
				<div className={cardstyles.card}>
					<div className={cardstyles.content}>
						<div className={cardstyles.imageContainer}>
							<img src={imageUrl} alt={fullName} className={cardstyles.image} />
						</div>
						<div className={cardstyles.textContent}>
							<h2 className={cardstyles.fullName}>{fullName}</h2>
							<p className={cardstyles.jobDescription}>{occupation}</p>
							<div className={cardstyles.contact}>
								<a href={website} className={cardstyles.website}>{website}</a>
								<a href={`mailto:${email}`} className={cardstyles.email}>{email}</a>
							</div>
						</div>

					</div>
				</div>
			</Link>
		</div>

	)
}

export default UserProfileCard

