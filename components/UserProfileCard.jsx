// UserProfileCard.js
import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaFacebook } from 'react-icons/fa';
import cardstyles from '../styles/VerticalCard.module.css';

const UserProfileCard = ({ firstname, lastname, id, occupation, linkedIn, facebook, email, imgUrl }) => {
	let fullName = firstname + ' ' + lastname;
	let imageUrl = imgUrl;

	return (
		<div className="bg-black text-white rounded-lg p-4 flex flex-col items-center space-y-4 h-full">
			<Link href={`/user/${id}`}>
				<div className="w-48 h-48 rounded-full overflow-hidden cursor-pointer">
					<img src={imageUrl} alt={fullName} className="w-full h-full object-cover" />
				</div>
			</Link>
			<div className="flex flex-col items-center space-y-2 flex-grow">
				<h2 className="text-3xl font-bold">{fullName}</h2>
				<p className="text-2xl text-gray-300">{occupation}</p>
			</div>
			<div className="flex flex-col items-center space-y-1">
				<a href={`mailto:${email}`} className="text-blue-400 hover:underline">{email}</a>
				<div className="flex space-x-4">
					<a href={`https://${linkedIn}`} className="text-white hover:text-blue-500"><FaLinkedin className={cardstyles.iconStyle} /></a>
					<a href={`https://${facebook}`} className="text-white hover:text-blue-500"><FaFacebook className={cardstyles.iconStyle} /></a>
				</div>
			</div>
		</div>
	);
};

export default UserProfileCard;





