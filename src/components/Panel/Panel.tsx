import React, { useCallback } from "react";
import styles from "./Panel.module.scss";
import { PanelProps } from "./Panel.props";
import { clsx } from "clsx";
// TODO: create alias or use non-relative paths
import Columns from "../Columns/Columns";
// import Image from 'next/image';

const Panel = ({
  column = 1,
  height = "full",
  children,
  imgSrc,
  imgAltText,
}: PanelProps) => {
  return (
    <div className={clsx(styles.containerPanel)}>
      <Columns column={column}>
        <figure className={clsx(styles[`height-${height}`])}>
          <img src={imgSrc} alt={imgAltText} />
        </figure>
      </Columns>
    </div>
  );
};

export default Panel;
