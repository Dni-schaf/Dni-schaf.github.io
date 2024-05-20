import React from 'react';
import styles from './Text.module.scss';
import { TextProps } from './Text.props';
import { clsx } from 'clsx';

const Text = ({
  color = 'light',
  positionTop,
  positionRight,
  positionBottom,
  positionLeft,
  children,
  backgroundColor,
}: TextProps) => {
  return (
    <div
      className={clsx(positionTop, positionRight, positionBottom, positionLeft)}
    >
      <p
        className={clsx(styles.bodyText, {
          [styles.colorLight]: color === 'light',
          [styles.colorDark]: color === 'dark',
        })}
        style={{ backgroundColor: backgroundColor }}
      >
        {children}
      </p>
    </div>
  );
};

export default Text;
