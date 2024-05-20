import React from 'react';
// import styles from './Hero.module.scss';
import { HeroProps } from './Hero.props';
// import { clsx } from 'clsx';

const Hero = ({ captial, heading, location }: HeroProps) => {
  return (
    <div>
      <h2>{captial}</h2>
      <h1>{heading}</h1>
      <h6>{location}</h6>
    </div>
  );
};

export default Hero;
