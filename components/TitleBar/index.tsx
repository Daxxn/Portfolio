import React from 'react';
import Link from 'next/link';
import styles from './TitleBar.module.css';

export type LinkType = {
  disp: string;
  href: string;
};

export interface TitleBarProp {
  links: LinkType[];
}

const TitleBar = (props: TitleBarProp) => {
  const { links } = props;

  return (
    <div className={styles.titlebarBase}>
      <h2 className={styles.titleText}>
        Daxxn Industries
      </h2>
      <div className={styles.linkList}>
        {links.length > 0 ? links.map((link) => (
          <Link key={`key-${link.href}-${link.disp}`} href={link.href}>
            <button className={styles.btn}>{link.disp}</button>
          </Link>
        )) : "No links..."}
      </div>
    </div>
  );
};

export default TitleBar;
