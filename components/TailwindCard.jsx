import React from "react";

import styles from '../styles/TailwindCard.module.css';
import Card from "./components/Card";
// import posts from "./data/posts";

const TailwindCard = () => {
    return (
        <main className={styles.section}>
            <section className={styles.container}>
                {/* <div className={styles.layout}>
                    {posts.map((element, index) => (
                        <Card
                            key={index}
                            title={element.title}
                            likes={element.likes}
                            order={index + 1}
                            image={element.image}
                        />
                    ))}
                </div> */}

                <div className={styles.layout}>
                    <Card
                        key={0}
                        title={"title"}
                        likes={'2'}
                        order={'3'}
                        image={'https://bit.ly/3CQFPvv'}
                    />
                </div>
            </section>
        </main>
    );
};

export default TailwindCard;