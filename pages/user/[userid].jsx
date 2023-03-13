import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";

// import { Heading } from "@chakra-ui/react";
import db from "../../firebase/config";


import styles from '../../styles/Profile.module.css';
import Navbar from '../../components/Navbar' 


const UserPage = () => {
  const [userData, setUserData] = useState(null);

  const { query: { userid } } = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userid) {
          console.log("No user")
          return;
        }
        // const docRef = db.doc("usersProfile", userid);
        const docRef = db.doc(`usersProfile/${userid}`);
        console.log(docRef)
        const docSnap = await docRef.get();

        if (docSnap.exists) {
          const data = docSnap.data();
          setUserData(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userid]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { firstname, lastname, occupation, website, image, email } = userData;
  let imageUrl = 'https://firebasestorage.googleapis.com/v0/b/ogs-two.appspot.com/o/360_F_448593569_kOEPextTZPc2rEZnlq7E3eXPF5Bb2XSU.jpg?alt=media&token=9831e520-727e-474d-9571-a2b77f4a1d2c'
  let fullname = firstname + ' ' + lastname
  return (
    <div>
      <Navbar />

      <div className={styles.mainContainer}>
      <div className={styles.profile}>
        <div className={styles.imageContainer}>
          <img
            src={imageUrl}
            alt="Profile Picture"
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.name}>{fullname}</h1>
          <h2 className={styles.occupation}>{occupation}</h2>
          <div className={styles.contact}>
            <p className={styles.email}>{email}</p>
            <p className={styles.website}>{website}</p>
            <div className={styles.social}>
                <a href="https://www.linkedin.com/in/johndoe">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/ogs-two.appspot.com/o/socials%2Fpng-transparent-linkedin-icon-linkedin-text-rectangle-logo-removebg-preview.png?alt=media&token=acfb99a3-7732-4eef-a365-4c85722ab7f5"
                    alt="LinkedIn"
                    className={styles.icon}
                  />
                </a>
                <a href="https://www.github.com/johndoe">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/ogs-two.appspot.com/o/socials%2F19-198304_github-logo-png-transparent-github-logo-png-png-removebg-preview.png?alt=media&token=fe61d559-ad91-429f-8adb-804578515fb5"
                    alt="GitHub"
                    className={styles.icon}
                  />
                </a>
              </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default UserPage;


// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { doc, getDoc } from "firebase/firestore";
// import { getStorage, ref, getDownloadURL } from "firebase/storage";

// import db from "../../firebase/config";

// import styles from '../../styles/Profile.module.css';
// import Navbar from '../../components/Navbar' 


// const UserPage = () => {
//   const [userData, setUserData] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);

//   const { query: { userid } } = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         if (!userid) {
//           console.log("No user");
//           return;
//         }

//         const docRef = db.doc(`usersProfile/${userid}`);
//         console.log(docRef)
//         const docSnap = await docRef.get();

//         if (docSnap.exists) {
//           const data = docSnap.data();
//           setUserData(data);

//           // Get the download URL of the user profile image
//           const storageRef = getStorage().ref();
//           const imageRef = ref(storageRef, `usersProfileImages/${data.uid}`);
//           const url = await getDownloadURL(imageRef);
//           setImageUrl(url);
//         } else {
//           console.log("No such document!");
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchUserData();
//   }, [userid]);

//   if (!userData || !imageUrl) {
//     return <div>Loading...</div>;
//   }

//   const { firstname, lastname, occupation, website, email } = userData;
//   let fullname = firstname + ' ' + lastname

//   return (
//     <div>
//       <Navbar />

//       <div className={styles.mainContainer}>
//         <div className={styles.profile}>
//           <div className={styles.imageContainer}>
//             <img
//               src={imageUrl}
//               alt="Profile Picture"
//               className={styles.image}
//             />
//           </div>
//           <div className={styles.textContainer}>
//             <h1 className={styles.name}>{fullname}</h1>
//             <h2 className={styles.occupation}>{occupation}</h2>
//             <div className={styles.contact}>
//               <p className={styles.email}>{email}</p>
//               <p className={styles.website}>{website}</p>
//               <div className={styles.social}>
//                 <a href="https://www.linkedin.com/in/johndoe">
//                   <img
//                     src="../../styles/assets/linkedin.png"
//                     alt="LinkedIn"
//                     className={styles.icon}
//                   />
//                 </a>
//                 <a href="https://www.github.com/johndoe">
//                   <img
//                     src="../../styles/assets/github.png"
//                     alt="GitHub"
//                     className={styles.icon}
//                   />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPage;
