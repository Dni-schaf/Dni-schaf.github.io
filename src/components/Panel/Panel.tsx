import React, { useCallback } from 'react';
import styles from './Panel.module.scss';
import { PanelProps } from './Panel.props';
import { clsx } from 'clsx';
// import Image from 'next/image';

const Panel = ({ column, height, children }: PanelProps) => {
  const renderColumns = useCallback(() => {
    // TODO: edit
    switch (column) {
      case 1:
        return <section>{children}</section>;
      case 2:
        return <section>{children}</section>;
      case 3:
        return <section>{children}</section>;
      default:
        return null;
    }
  }, [column, children]);

  return (
    <div className={clsx(styles.panel, styles[column], styles[height])}>
      {renderColumns()}
    </div>
  );
};

export default Panel;