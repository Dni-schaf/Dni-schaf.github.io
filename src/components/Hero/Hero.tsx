import React from 'react';
import styles from './Hero.module.scss';
import { HeroProps } from './Hero.props';
// import { clsx } from 'clsx';
import Image from 'next/image';

const Hero = ({
  capital,
  heading,
  location,
  imageSrc,
  imageAltText,
}: HeroProps) => {
  return (
    <section className={styles.container}>
      {/* TODO: add spacer component */}
      <article className={styles.article}>
        <h2 className={styles.captial}>{`Kapitel ${capital}`}</h2>
        <h1 className={styles.heading}>{heading}</h1>
        {/* TODO: add spacer component */}
        <h3 className={styles.location}>{location}</h3>
      </article>
      <Image
        src={imageSrc}
        alt={imageAltText}
        sizes="100vw"
        width={0}
        height={0}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </section>
  );
};

export default Hero;
