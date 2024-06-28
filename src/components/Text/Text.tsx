import React, { CSSProperties } from "react";
import styles from "./Text.module.scss";
import { TextProps } from "./Text.props";
import { clsx } from "clsx";

const positionStyles = {
  position: "absolute",
};

const Text = ({
  color = "light",
  positionTop,
  positionRight,
  positionBottom,
  positionLeft,
  children,
  backgroundColor,
}: TextProps) => {
  const positioningStyles = {
    ...positionStyles,
    top: `${positionTop}px`,
    right: `${positionRight}px`,
    bottom: `${positionBottom}px`,
    left: `${positionLeft}px`,
  };

  const styleProps = positioningStyles as CSSProperties;
  return (
    // <article className={styles.article}>
    <p
      className={clsx(styles.bodyText, styles.article, {
        [styles.colorLight]: color === "light",
        [styles.colorDark]: color === "dark",
      })}
      style={styleProps}
    >
      {children}
    </p>
    // </article>
  );
};

export default Text;
