import React, { useCallback } from "react";
import styles from "./Columns.module.scss";
import { ColumnsProps } from "./Columns.props";
import { clsx } from "clsx";
// import Image from 'next/image';

const Columns = ({ column, children }: ColumnsProps) => {
  return (
    <div className={clsx(styles.containerColumns, styles[`column-${column}`])}>
      {children}
    </div>
  );
};

export default Columns;
